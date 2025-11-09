import type { RenderProps } from 'input-otp';
import { Fragment, useMemo } from 'react';

import FormOtpSeparator from 'components/Form/Otp/Separator';
import FormOtpSlot from 'components/Form/Otp/Slot';

import './Render.scss';

export default function FormOtpRender({
  groups,
  maxLength,
  slots,
}: RenderProps & {
  groups: number;
  maxLength: number;
}) {
  // Split slots into x groups for better UX
  const chunks = useMemo(() => {
    const size = Math.ceil(maxLength / groups);
    const _chunks = [];

    for (let i = 0; i < maxLength; i += size) {
      _chunks.push(slots.slice(i, i + size));
    }

    return _chunks;
  }, [ maxLength, groups, slots ]);

  return chunks.map((chunk, chunkIndex) => (
    // eslint-disable-next-line react/no-array-index-key
    <Fragment key={ chunkIndex }>
      <div className="form-otp-render">
        { chunk.map((slot, idx) => (
          <FormOtpSlot
            // eslint-disable-next-line react/no-array-index-key
            key={ idx }
            { ...slot }
          />
        )) }
      </div>
      { chunkIndex < chunks.length - 1 && <FormOtpSeparator /> }
    </Fragment>
  ));
}
