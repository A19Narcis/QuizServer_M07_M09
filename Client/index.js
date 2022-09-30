var app = new Vue({
    el: "#app",
    data: {
        info: {num : 4},
        preguntes: [],
    },
    vuetify: new Vuetify(),
    methods: {
        getQuest: function () {
            console.log("Get data");
            const myHeaders = new Headers();
        
            fetch("http://localhost:3000/getPreguntes",
                {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json',
                },
                mode: "cors",
                cache: "default",
                body: JSON.stringify(this.info)
                }
            ).then(
                (response)=>{
                    return(response.json());
                }
            ).then(
                (quiz) => {
                    this.preguntes = quiz;
                }
            ).catch(
                (error) => {
                    //console.log("Error: " + error)
                }
            );
        }
    },
    
})