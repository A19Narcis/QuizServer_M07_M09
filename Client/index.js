var app = new Vue({
    el: "#app",
    data: {
        info: {num : null},
        preguntes: [],
        isVisible: false,
        radioGroup: new Array(this.num),
        solucions: 0,
        acabat: false,
        snackbar: false,
        text: "",
        start: true
    },
    vuetify: new Vuetify(),
    methods: {
        getQuest: function () {
            console.log("Get data");
            this.isVisible = true;
            this.start = false;
            this.info.num = document.getElementById("numQuestions").value;
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
            if(this.radioGroup[0] == undefined){
                this.radioGroup.length = 0;
            }
            if (this.radioGroup.length == this.info.num/*this.radioGroup.length == this.info.num*/) {
                this.snackbar = true;
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
                        this.text = "Resultat => " + this.solucions + "/" + this.info.num
                        
                    }
                ).catch(
                    (error) => {
                        //console.log("Error: " + error)
                    }
                );           
            } else {
                console.log("No se puede");
            }
        },
    },
})