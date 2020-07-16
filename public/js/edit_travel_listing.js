$("document").ready(()=>{
    const createItineraryRow = (data)=>{
        let row = $('<tr class="created"></tr>');
        let day = $(`<td>${data.day}</td>`);
        let activity = $(`<td>${data.activity}</td>`);
        row.append(day);
        row.append(activity);
        $("#data").prepend(row);
    }
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
    $(`#itinerary`).click(()=>{
        let yo = document.getElementsByClassName("created");
        for(x = 0; x < yo.length; x++){
            yo[x].remove();
        }
        axios.get(`http://127.0.0.1:3000/travel/${travelData.travel_id}/itinerary`).then((response)=>{
            response.data.every(createItineraryRow);
        })
    })
    $("#add").click(()=>{
        itinerary_data.every(clear);
        itinerary_data.every(validate);
        if(validated){
            itinerary_data.every(appendForm);
            axios.post(`http://127.0.0.1:3000/travel/${travelData.travel_id}/itinerary`,body,config).then((response)=>{
                window.location.href = "http://127.0.0.1:3000/edit"
            })
        }
        
    })

})