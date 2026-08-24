
showReviews();

async function showReviews() {
    try {
        var response = await fetch("/reviews");
        var reviews = await response.json();
        var reviewsList = document.querySelector(".reviews");
        reviewsList.innerHTML = "<h2>Customer Reviews</h2>";

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

document.getElementById("submitBtn").addEventListener("click", addReview);
async function addReview() {

    var name = document.getElementById("name").value;
    var rating = document.getElementById("rating").value;
    var review = document.getElementById("review").value;
    if (name == "" || review == "") {

        alert("Please fill all fields");
        return;

    }


    try {
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

        if (!response.ok) {
            alert("Review could not be added");
            return;
        }


        document.getElementById("name").value = "";
        document.getElementById("review").value = "";


        alert("Review added successfully!");

        showReviews();

    }
    catch (error) {
        console.log("Error adding review:", error);
        alert("Something went wrong");

    }

}
