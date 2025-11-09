# Convex

## Required Function Syntax Pattern

```ts
import { query } from "./_generated/server";
import { v } from "convex/values";

export const myQuery = query({
  args: { id: v.id("tableName") },
  returns: v.union(v.object({...}), v.null()),
  handler: async (ctx, args) => {
    // implementation
  }
});
```

## HTTP Endpoints Pattern

```ts
// convex/http.ts
import { httpRouter } from 'convex/server';
import { httpAction } from './_generated/server';

const http = httpRouter();
http.route({
  path: '/api/endpoint',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    // implementation
  }),
});
```

## Validators Pattern

### Array Validator

```ts
args: {
  items: v.array(v.union(v.string(), v.number()));
}
```

### Object Validator

```ts
args: {
  user: v.object({ name: v.string(), age: v.optional(v.number()) });
}
```

### Discriminated Union

```ts
defineTable(
  v.union(
    v.object({ kind: v.literal('error'), message: v.string() }),
    v.object({ kind: v.literal('success'), value: v.number() }),
  ),
);
```

### Always Use v.null() for null Returns

```ts
returns: v.union(v.object({...}), v.null())
```

## Function Registration & Calling Pattern

```ts
// Same-file calls need type annotation
const result: string = await ctx.runQuery(api.example.f, { name: 'Bob' });
```

## Schema Patterns

### Tables with Relations

```ts
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    createdAt: v.number(),
  }).index('by_email', ['email']),

  posts: defineTable({
    title: v.string(),
    authorId: v.id('users'),
    publishedAt: v.optional(v.number()),
  }).index('by_author', ['authorId']),
});
```

## Query Patterns

### Basic Query

```ts
export const getItems = query({
  args: { userId: v.optional(v.id('users')) },
  handler: async (ctx, args) => {
    let query = ctx.db.query('items');
    if (args.userId) {
      query = query.withIndex('by_user', q => q.eq('userId', args.userId));
    }
    return await query.collect();
  },
});
```

### Pagination

```ts
import { paginationOptsValidator } from 'convex/server';

export const listPaginated = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db.query('items').paginate(args.paginationOpts);
    // Returns: { page: T[], isDone: boolean, continueCursor: string }
  },
});
```

### Full-Text Search

```ts
const results = await ctx.db
  .query('messages')
  .withSearchIndex('search_body', q => q.search('body', 'search terms').eq('channel', '#general'))
  .take(10);
```

### Basic Query with Index

```ts
const docs = await ctx.db
  .query('table')
  .withIndex('by_field', q => q.eq('field', value))
  .order('desc')
  .take(10);
```

### Search index

```ts
const results = await ctx.db
  .query('table')
  .withSearchIndex('search_field', q => q.search('field', 'query').eq('category', 'value'))
  .take(10);
```

## Mutations

```ts
// CRUD operations
await ctx.db.insert('table', doc);
await ctx.db.patch(id, updates);
await ctx.db.replace(id, doc);
await ctx.db.delete(id);
```

## Type Reference

| Convex Type | TS Type | Validator       | Notes            |
| ----------- | ------- | --------------- | ---------------- |
| Id          | string  | `v.id("table")` | Document ID      |
| String      | string  | `v.string()`    | UTF-8, <1MB      |
| Float64     | number  | `v.number()`    | IEEE-754         |
| Boolean     | boolean | `v.boolean()`   |                  |
| Array       | Array   | `v.array(type)` | Max 8192 items   |
| Object      | Object  | `v.object({})`  | Max 1024 entries |
| Record      | Record  | `v.record(k,v)` | Dynamic keys     |

## Actions with Node.js Runtime

```ts
'use node'; // Always for Node.js modules!

import { action } from './_generated/server';
import OpenAI from 'openai';

export const processWithAI = action({
  args: { content: v.string() },
  returns: v.string(),
  handler: async (ctx, args) => {
    const openai = new OpenAI();
    // Node.js specific operations
  },
});
```

## File Storage Operations

### Get File URL (Returns null if Not Found)

```ts
const url = await ctx.storage.getUrl(fileId);
```

### Query File Metadata from System Table

```ts
import { Id } from './_generated/dataModel';
const metadata: {
  _id: Id<'_storage'>;
  _creationTime: number;
  contentType?: string;
  sha256: string;
  size: number;
} | null = await ctx.db.system.get(fileId);
```

## Scheduled Functions

```ts
await ctx.scheduler.runAfter(0, internal.file.function, args);
await ctx.scheduler.runAt(timestamp, internal.file.function, args);
```

## Type Definitions for Complex Returns

### Discriminated Unions

```ts
returns: v.union(
  v.object({
    kind: v.literal('error'),
    errorMessage: v.string(),
  }),
  v.object({
    kind: v.literal('success'),
    value: v.number(),
  }),
);
```

### Arrays of Complex Objects

```ts
returns: v.array(
  v.object({
    _id: v.id('messages'),
    _creationTime: v.number(),
    channelId: v.id('channels'),
    authorId: v.optional(v.id('users')),
    content: v.string(),
  }),
);
```

## TypeScript Circularity Workaround

```ts
export const caller = query({
  handler: async (ctx, args) => {
    const result: string = await ctx.runQuery(api.thisFile.otherFunction, { name: 'value' });
    return result;
  },
});
```

## Cron Jobs

```ts
import { cronJobs } from 'convex/server';
import { internal } from './_generated/api';

const crons = cronJobs();
crons.interval('task', { hours: 2 }, internal.file.function, {});
export default crons;
```
