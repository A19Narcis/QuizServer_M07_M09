var app = new Vue({
    el: "#app",
    data: {
        info: {num : 4},
        question: "",
        opt1: "",
        opt2: "",
        opt3: "",
        opt4: ""
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
                    this.question = data[0].question;
                    this.opt1 = data[0].options[0];
                    this.opt2 = data[0].options[1];
                    this.opt3 = data[0].options[2];
                    this.opt4 = data[0].options[3];
                    
                }
            ).catch(
                (error) => {
                    //console.log("Error: " + error)
                }
            );
        }
    },
    
})