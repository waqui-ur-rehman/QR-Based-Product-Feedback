// Page open hote hi database se reviews load karna
showReviews();


// MongoDB se reviews mangwa kar page par show karna
async function showReviews() {

    try {

        var response = await fetch("/reviews");

        var reviews = await response.json();

        var reviewsList = document.querySelector(".reviews");

        reviewsList.innerHTML = "<h2>Customer Reviews</h2>";


        // For loop har review ko aik aik karke page par show karega
        for (var i = 0; i < reviews.length; i++) {

            reviewsList.innerHTML += `
            
            <div class="review">

                <h3>${reviews[i].name}</h3>

                <p>${"⭐".repeat(reviews[i].rating)}</p>

                <p>${reviews[i].review}</p>

            </div>

            `;

        }

    }
    catch (error) {

        console.log("Error loading reviews:", error);

    }

}



// Submit button par click hone par addReview function chalega
document.getElementById("submitBtn").addEventListener("click", addReview);


// New review add karna
async function addReview() {

    var name = document.getElementById("name").value;

    var rating = document.getElementById("rating").value;

    var review = document.getElementById("review").value;


    // Empty fields check karna
    if (name == "" || review == "") {

        alert("Please fill all fields");

        return;

    }


    try {

        // Review backend ko bhejna
        var response = await fetch("/reviews", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                name: name,

                rating: Number(rating),

                review: review

            })

        });


        // Agar backend ne error diya
        if (!response.ok) {

            alert("Review could not be added");

            return;

        }


        // Form clear karna
        document.getElementById("name").value = "";

        document.getElementById("review").value = "";


        alert("Review added successfully!");


        // Reviews dobara load karna
        showReviews();

    }
    catch (error) {

        console.log("Error adding review:", error);

        alert("Something went wrong");

    }

}
