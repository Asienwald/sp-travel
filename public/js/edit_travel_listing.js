$("document").ready(()=>{
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
            axios.put("http://127.0.0.1:3000/travel",body,config).then((response)=>{
                M.toast({html: "Added travel listing!"});
                $("#travel").trigger("reset");
            });
            body = new FormData();
        }
    })
    $("#delete").click(()=>{
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
            axios.put("http://127.0.0.1:3000/travel",body,config).then((response)=>{
                M.toast({html: "Added travel listing!"});
                $("#travel").trigger("reset");
            });
            body = new FormData();
        }
    })

})