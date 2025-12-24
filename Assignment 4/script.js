const API_BASE = "https://www.themealdb.com/api/json/v1/1";
const SEARCH_API = `${API_BASE}/search.php?s=`;
const LOOKUP_API = `${API_BASE}/lookup.php?i=`;

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const recipesGrid = document.getElementById("recipesGrid");
const loading = document.getElementById("loading");
const noResults = document.getElementById("noResults");
const modal = document.getElementById("modal");
const modalOverlay = document.getElementById("modalOverlay");
const modalContent = document.getElementById("modalContent");
const modalLoading = document.getElementById("modalLoading");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.getElementById("closeModal");

function createRecipeCard(meal) {
	const card = document.createElement("div");
	card.className =
		"bg-white rounded-xl shadow-md overflow-hidden card-hover transition-all duration-300 cursor-pointer";
	card.innerHTML = `
                <div class="relative overflow-hidden">
                    <img 
                        src="${meal.strMealThumb}" 
                        alt="${meal.strMeal}" 
                        class="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                        loading="lazy"
                    >
                    <div class="absolute top-3 right-3">
                        <span class="px-3 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-full">
                            ${meal.strCategory || "Recipe"}
                        </span>
                    </div>
                </div>
                <div class="p-5">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">${
											meal.strMeal
										}</h3>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2">
											${meal.strInstructions}</p>
                    <button 
                        class="w-full py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                        onclick="openModal('${meal.idMeal}')"
                    >
                        View Details
                    </button>
                </div>
            `;
	return card;
}

async function fetchRecipes(query = "") {
	try {
		loading.classList.remove("hidden");
		recipesGrid.innerHTML = "";
		noResults.classList.add("hidden");
		searchBtn.disabled = true;

		const response = await fetch(`${SEARCH_API}${encodeURIComponent(query)}`);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await response.json();

		loading.classList.add("hidden");
		searchBtn.disabled = false;

		if (!data.meals || data.meals.length === 0) {
			noResults.classList.remove("hidden");
			return;
		}

		data.meals.forEach((meal) => {
			const card = createRecipeCard(meal);
			recipesGrid.appendChild(card);
		});
	} catch (error) {
		console.error("Error fetching recipes:", error);
		loading.classList.add("hidden");
		searchBtn.disabled = false;
		noResults.classList.remove("hidden");
	}
}

async function fetchRecipeDetails(id) {
	try {
		const response = await fetch(`${LOOKUP_API}${id}`);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await response.json();
		return data.meals ? data.meals[0] : null;
	} catch (error) {
		console.error("Error fetching recipe details:", error);
		return null;
	}
}

function getIngredients(meal) {
	const ingredients = [];
	for (let i = 1; i <= 20; i++) {
		const ingredient = meal[`strIngredient${i}`];
		const measure = meal[`strMeasure${i}`];

		if (ingredient && ingredient.trim()) {
			ingredients.push({
				ingredient: ingredient.trim(),
				measure: measure ? measure.trim() : "",
			});
		}
	}
	return ingredients;
}

async function openModal(mealId) {
	modal.classList.remove("hidden");
	modalLoading.classList.remove("hidden");
	modalBody.classList.add("hidden");
	document.body.style.overflow = "hidden";

	const meal = await fetchRecipeDetails(mealId);

	if (!meal) {
		closeModal();
		return;
	}

	document.getElementById("modalImage").src = meal.strMealThumb;
	document.getElementById("modalImage").alt = meal.strMeal;
	document.getElementById("modalTitle").textContent = meal.strMeal;
	document.getElementById("modalCategory").querySelector("span").textContent =
		meal.strCategory || "N/A";
	document.getElementById("modalArea").querySelector("span").textContent =
		meal.strArea || "N/A";
	document.getElementById("modalInstructions").textContent =
		meal.strInstructions;

	const ingredientsList = document.getElementById("modalIngredients");
	ingredientsList.innerHTML = "";

	const ingredients = getIngredients(meal);
	ingredients.forEach(({ ingredient, measure }) => {
		const li = document.createElement("li");
		li.className =
			"flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-2";
		li.innerHTML = `
                    <span class="w-2 h-2 bg-yellow-500 rounded-full shrink-0"></span>
                    <span><strong>${measure}</strong> ${ingredient}</span>
                `;
		ingredientsList.appendChild(li);
	});

	modalLoading.classList.add("hidden");
	modalBody.classList.remove("hidden");
}

function closeModal() {
	modal.classList.add("hidden");
	document.body.style.overflow = "";
}

searchBtn.addEventListener("click", () => {
	const query = searchInput.value.trim();
	fetchRecipes(query);
});

searchInput.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		const query = searchInput.value.trim();
		fetchRecipes(query);
	}
});

closeModalBtn.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
	if (e.key === "Escape" && !modal.classList.contains("hidden")) {
		closeModal();
	}
});

modalContent.addEventListener("click", (e) => {
	e.stopPropagation();
});
document.addEventListener("DOMContentLoaded", () => {
	fetchRecipes("");
});
