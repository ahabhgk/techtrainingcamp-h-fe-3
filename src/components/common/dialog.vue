<template>
  <transition name="fade">
    <div class="dialog-shadow" v-if="isShow">
      <div class="dialog-wrapper">
        <slot></slot>
        <div class="btn-wrapper">
          <button class="btn" @click="$emit('cancel')">取消</button>
          <button class="btn" @click="$emit('ok')">确定</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isShow: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/utils.scss";

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.dialog-shadow {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba($color: #000000, $alpha: .4);
  .dialog-wrapper {
    width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .btn-wrapper {
      display: flex;
      justify-content: space-between;
      .btn {
        flex: 1;
        outline: none;
        border: none;
        height: 40px;
        color: #fdfdfd;
        font-size: 16px;
        font-weight: bold;
        border-radius: 0;
        background-color: #424361;
        @include btn-ripple;
      }
    }
  }
}
</style>
