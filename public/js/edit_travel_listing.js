$("document").ready(()=>{
    
    let travelData =  JSON.parse(localStorage.getItem("data"))
    fill_form(travelData);
    $("#update").click(()=>{
        data.every(clear);
        data.every(validate);
        if($("#image")[0].files[0] != undefined){
            body.append("upload",$("#image")[0].files[0])
        }
        if(!validated){
            M.toast({html: 'Please fill in all fields!'});
        }
        else{
            data.every(appendForm);
            axios.put(`http://127.0.0.1:3000/travel/${travelData.travel_id}`,body,config).then((response)=>{
                M.toast({html: "Updated travel listing!"});
                $("#travel").trigger("reset");
            });
            body = new FormData();
        }
    })
    $("#delete").click(()=>{
        axios.delete(`http://127.0.0.1:3000/travel/${travelData.travel_id}`).then((response)=>{
            window.location.href = `http://127.0.0.1:3000/admin`
        })
    })

})