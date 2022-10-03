var app = new Vue({
    el: "#app",
    data: {
        info: {num : 4},
        preguntes: [],
        isVisible: false
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
            console.log("Getting selected options");

            var ele = document.getElementsByName('radioBTN');

            console.log(ele.length);
            var selected = [];
            
            for (let i = 0; i < ele.length; i++) {
                console.log(ele[i].value);
                if (ele[i].checked) {
                    console.log("Selected...");
                    console.log("ADD -> " + ele[i].value);
                    selected.push(ele[i].value);
                    //document.getElementById("result").innerHTML = "Resposta: " + selected;
                }
            }

            selected.forEach(function(entry){
                console.log("- " + entry);
            })
        }
    },
    
})