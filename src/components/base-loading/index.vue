<script lang="tsx">
import type { Component, PropType } from 'vue';
import type { LoadingEnum } from '~#/loading-enum';
import { loadingMap } from '~#/loading-enum';
export default defineComponent({
  name: 'BaseLoading',
  props: {
    text: {
      type: String,
      default: '正在加载中...',
    },
    textColor: {
      type: String,
      default: '#79bbff',
    },
    background: {
      type: String,
      default: 'rgba(0, 0, 0, .5)',
    },
    modal: {
      type: Boolean,
      default: true,
    },
    spin: {
      type: String as PropType<LoadingEnum>,
      default: 'chase',
    },
    full: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const renderBasicLoading = () => {
      const { spin, textColor } = props;
      return h(loadingMap.get(spin) as Component, { color: textColor } as any);
    };

    return () => {
      const { background, modal, full, text, textColor } = props;
      return (
        <div style={modal ? { background } : {}} class={{ 'loading-container': true, 'is-fullscreen': full }}>
          <div class="absolute top-50% w-full mt--21px text-center">
            {renderBasicLoading()}
            <div class="w-full my-8px" style={{ color: textColor }}>
              {text}
            </div>
          </div>
        </div>
      );
    };
  },
});
</script>

<style lang="less" scoped>
.loading-container {
  position: absolute;
  inset: 0;
  z-index: 9999;

  &.is-fullscreen {
    position: fixed;
  }
}
</style>
