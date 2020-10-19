export default {
    install (Vue, options) {
      Vue.prototype.$Plugin = function () {
        this.$http
        .get("/Userinfos/GetNavMenuItem")
        .then(result => {
          this.ResultList = result;
          if (this.ResultList.error == true) {
            this.$message.error(this.ResultList.message);
          
          } else {
            this.$store.state.NavMenuModel = result.data;
          
          }
          this.$store.state.fullscreenLoading = true;
        })
        .catch(error => {
          console.log(error.headers.tokenexpired);
          if (error.headers.tokenexpired == "true") {
            localStorage.clear();
            this.$router.push("/");
            return;
          }
          localStorage.clear();
           this.$router.push("/");
           this.$store.state.fullscreenLoading = true;
        });
      }
    }
  }