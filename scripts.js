window.addEventListener('load', function () {
    document.querySelector('input[type="file"]').addEventListener('change', function () {
        if (this.files && this.files[0]) {
            var img = document.querySelector('img');  // $('img')[0]
            img.src = URL.createObjectURL(this.files[0]); // set src to file url
            img.onload = imageIsLoaded; // optional onload event listener
        }
    });
});

function imageIsLoaded(e) {
    const img = document.getElementById('myImg');
        
    document.getElementById("hookolme").innerHTML = "...";
    // Load the model.
    cocoSsd.load().then(model => {
        // detect objects in the image.
        model.detect(img).then(predictions => {
            try{
                console.log('Predictions: ', predictions);
                console.log(predictions[0].class)
    
                text = predictions[0].class
                score = Math.round(predictions[0].score * 100)
    
                document.getElementById("hookolme").innerHTML = text + ", i'm " + score + "% sure";
            }
            catch{
                document.getElementById("hookolme").innerHTML = "no idea...";
            }

        });
    });
}