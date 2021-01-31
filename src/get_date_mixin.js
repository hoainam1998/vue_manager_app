export default {
    methods:{
        getDate() {
        let date = new Date();
        let day =
          `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()},` +
          `${date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          })}`;
        return day;
      }
    }
}