var app = new Vue({
    el: "#app",
    data: {
        info: {num : 4},
        preguntes: [],
        isVisible: false,
        radioGroup: new Array(this.num),
        solucions: 0,
        acabat: false
    },
    vuetify: new Vuetify(),
    methods: {
        getQuest: function () {
            console.log("Get data");
            this.isVisible = true;
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
        },

        veureSelects: function() {
            console.log("Get Resultats");
            console.log(this.radioGroup);
            const myHeaders = new Headers();
            this.acabat = true;
        
            fetch("http://localhost:3000/finalista",
                {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json',
                },
                mode: "cors",
                cache: "default",
                body: JSON.stringify(this.radioGroup)
                }
            ).then(
                (response)=>{
                    return(response.json());
                }
            ).then(
                (data) => {
                    this.solucions = data;
                    console.log(data);
                    
                }
            ).catch(
                (error) => {
                    //console.log("Error: " + error)
                }
            );
        },
    },
})