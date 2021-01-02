const qrCodePHP = {
    qrCode: function(){
        let q = document.querySelector(".qrCode");
        if(q !== null){
            return q;
        }
    },
    getBanner: function(){
        let banner = document.querySelector("main .container section.preview .banner");
        if(banner !== null){
            return banner;
        }
    },
    getUrlProduct: function(){
        let url = document.querySelector("#urlProduct");
        if(url !== null){
            return url.value;
        }
    },
    managerQrCodeDiv: function(src){
        let qrCode = document.querySelector(".qrCode");
        qrCode.innerHTML = "";

        let img = document.createElement("img");
            img.src = src;

            qrCode.append(img);
    },
    download: function(){
        let target = document.querySelector(".download button");
        target.addEventListener("click",function(){
            setTimeout(function(){
                qrCodePHP.imagePreset(document.querySelector("section.preview"))
            }, 500);
        });
    },
    getPositions: function(){
        function horizontal(){
            let column = document.querySelector("#grid-column");
            if(column !== null){
                column.addEventListener("change", function(e){
                    q = qrCodePHP.qrCode();
                    q.style.gridColumn = e.target.value;
                });
            }
        }

        function vertical(){
            let row = document.querySelector("#grid-row");
            if(row !== null){
                row.addEventListener("change", function(e){
                    q = qrCodePHP.qrCode();
                    q.style.gridRow = e.target.value;
                });
            }
        }

        horizontal();
        vertical();
    },
    getPreviewImage: function(){
        let image = document.querySelector(".uploadFile");

        if(image !== null){
            image.addEventListener("change", function(e){
                let input = e.target;
                
                if(input.files && input.files[0]){
                    var reader = new FileReader();
                }

                reader.onload = function (e) {
                    banner = qrCodePHP.getBanner();
                    //console.log(input.files[0])
                    banner.style.background = `url('${e.target.result}') no-repeat top center`;
                    banner.style.backgroundSize = "contain";
                }

                reader.readAsDataURL(input.files[0]);
            });
        }
    },
    getDataFromPHP: async function(){
        let btn = document.querySelector("button[type=submit]");
        
        if(btn){
            btn.addEventListener("click", async function(e){
                e.preventDefault();
                let target = document.querySelector(".download button");
                target.style.display = "block";

                let url = qrCodePHP.getUrlProduct();

                if(url === ''){
                    alert("preencha a url");
                    return;
                }

                let formInline = document.querySelector(".form-inline").style.display = "grid"
                
                getDevices = async () => {
                    const settings = {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        }
                    };
                    try {
                        const fetchResponse = await fetch(`lib/callback.php?url=${url}`, settings);
                        const data = await fetchResponse.json();
                        return data;
                    } catch (e) {
                        return e
                    }    
                }

                let data = getDevices().then(function(e){
                    qrCodePHP.managerQrCodeDiv(e.qrCode)
                })
            })
        }
    },
    imagePreset(div){
        html2canvas(div).then(canvas => {
            let url = canvas.toDataURL();

            var x = window.open();
            x.document.open();
            x.document.write(`<img src='${url}'/>`);
            x.document.close();
            

            
        });
    },
    init: function(){
        this.getPreviewImage();
        this.getPositions();
        this.getDataFromPHP();
        this.download();
    }
}

window.addEventListener("load",qrCodePHP.init());