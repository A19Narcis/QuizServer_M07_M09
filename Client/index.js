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
        start: true,
        numTotalPreguntes: 0,
        timeout: 2000
    },
    vuetify: new Vuetify(),
    methods: {
        getQuest: function () {
            const myHeaders = new Headers();

            //Treure el numero de preguntes per validar el num de l'usuari
            fetch("http://localhost:3000/getNumPreguntes",
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
                    this.info.num = document.getElementById("numQuestions").value;
                    this.numTotalPreguntes = data;
                    if (this.numTotalPreguntes < this.info.num) {
                        console.log("No se puede");
                    } else {
                        console.log("Get data");
                        if (this.info.num != "" && this.info.num > 0) {
                            this.isVisible = true;
                            this.start = false;
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
                        } else {
                            console.log("No se puede");
                        }
                    }
                }
            ).catch(
                (error) => {
                    //console.log("Error: " + error)
                }
            );
        },

        veureSelects: function() {
            var longRadioGroup = 0;
            if(this.radioGroup[0] == undefined){
                this.radioGroup.length = 0;
            }
            for (let i = 0; i < this.radioGroup.length; i++) {
                if (this.radioGroup[i] == null) {
                    longRadioGroup--;
                } else {
                    longRadioGroup++;
                } 
            }
            if (longRadioGroup == this.info.num) {
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
                        this.text = "Resultat -> " + this.solucions + "/" + this.info.num
                        
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