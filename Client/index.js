var app = new Vue({
    el: "#app",
    data: {
        info: {num : 4},
        question: "",
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
                (data) => {
                    console.log(data);
                    var pregunta = JSON.stringify(data)
                    this.question = pregunta
                }
            ).catch(
                (error) => {
                    //console.log("Error: " + error)
                }
            );
        }
    },
    
})