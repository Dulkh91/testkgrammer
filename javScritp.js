var arrData = ""
let waitingURL = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjguAHNq3Pp0FLoZPlzp8_mS1yXRISsA9vKfJ31eeDqERRzHK0s7FsWsxTYTLTcByvwFvLcvKoXOaISC87ADBSqj5sx6NEVckMk9avPk0FkeACXV2IQq-DD6ueEV-o11DMXD1En_4GiSp1Q2gPbHuiL9Z1B2TNnspKlTxYBzrj2iCF8vWKwXef-mE6w-JI/s1600/loading-gif-png-5.gif'

let waiting = `<div class="loading">
                    <img src="${waitingURL}" alt="">
              </div>`
document.getElementById("data-view").innerHTML = waiting

$.ajax({
    url:'https://script.google.com/macros/s/AKfycbzKxkICetmOquUfrB_pesjYzrlW-dFOApCXd-JMC3c2CiqscuzLFFCvCqL1_fIw9AKp/exec',
    type: 'GET',
    success: function(respon){
        try {
            if(respon.STATUS != 200){
                alert(Error)
            }else{
                tranferData(respon.DATA) 
            }
        } catch (error) {
            console.log(error)
        }   
    }
})

function tranferData(data){
    document.title = "Grammar in use"
    arrData = data
    displayData(arrData)
    clickDetail(arrData)
    search()
}

function displayData(data){
    $("#search-bar").focus()
   
    let word = ""
    for(d of data){
        word +=` <div class="container text-view">
                    <h5>${d.EN + d.KR}</h5>
                    <p class="text-p">${d.BOOK}</p>
                </div>`
    }
    // document.getElementById("data-view").innerHTML = waiting
    document.getElementById("data-view").innerHTML = word
}

function search(){
    $("#search-bar").on("search",function(){
        window.location.reload()
    })

    $("#search-bar").keyup(function(){
        let value = $(this).val()
        let resultSearch = valsearch(value, arrData)
        displayData(resultSearch)

       clickDetail(resultSearch)

    })
    
    function valsearch(value, data){
        var searchValue = []
        for(s of data){
            if(s.KR.includes(value)){
                searchValue.push(s)
            }
        }
        return searchValue
    }

}
function clickDetail(d){
    
    $(".text-view").click(function(){
        let num = $(this).index()
        //MARK: make hide main
       // $(".main").hide()
        let images = []

        for(i of d){
            let image = i.URLPAGE
            images.push(image)
        }
        
        let img = images[num].split(",")

        var newImage =""
        // let url = 'https://drive.google.com/uc?export=view&id='
        // let url1 = 'https://drive.google.com/uc?id=' 
        // let url2 = 'https://lh3.google.com/u/0/d/'
        let imageURL = 'https://koreagrammarinuse.files.wordpress.com/2024/01/'
                    
        for(i of img){
        //    console.log(url+i)
            // newImage += `<img src="${url2+i}">`
            // console.log(imageURL+i+".jpeg")
            newImage += `<img src="${ imageURL+i+".jpeg"}">`
                                  
        }

       let detail = `<div class="container detail-view">
                        <nav class="nav-detail">
                            <div class="btn-back"><i class="fa fa-chevron-left"></i></div>
                            <h5 class="text">${d[num].EN} ${d[num].KR}</h5>
                        </nav>
                            <div class="container image-box">
                                ${newImage}
                            </div>
                    </div>`

         $('body').append(detail)
        back()
        // turn of background color of nav main
        $('.nav').css({'background-color': 'rgb(62, 62, 62)'})
        // turn off scroll of main
        $('body').css({'overflow-y': 'hidden'})
        // Make active of list 
        $(".text-view").removeClass('add-text-view')
        $(".text-view").eq(num).addClass('add-text-view')
    })
}


function back(){
    $(document).ready(function(){
        $(".btn-back").click(function(){
           $(".detail-view").remove()
           $('.nav').css({'background-color': 'rgb(26, 25, 25)'})
           $('body').css({'overflow-y': 'scroll'})
        })
    })
}





