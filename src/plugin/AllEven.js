export default {
    install (Vue, options) {
      Vue.prototype.$Plugin = function () {
        this.$http
        .get("/Menu/GetMenuTree")
        .then(result => {
          this.ResultList = result;
          if (this.ResultList.error == true) {
            this.$message.error(this.ResultList.message);
          } else {
            console.log(result)
            this.$store.state.NavMenuModel = result;
          }
          this.$store.state.fullscreenLoading = true;
        })
        .catch(error => {
      
         
           this.$store.state.fullscreenLoading = true;
        });
      }
    }
  }