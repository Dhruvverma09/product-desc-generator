# Prompts Log — HimShakti ListingAI

## Variation 1: Structured detail (current implementation)
**Prompt:** Expert e-commerce copywriter role + structured fields (name, category, weight, ingredients, features, tone) + explicit tone definitions (Premium/Traditional/Health-Focused explained).
**Input:** Barnyard Millet Namkeen / Health-Focused
**Output:** Indulge in a guilt-free snacking experience with our premium Barnyard Millet Namkeen, a nutrient-rich powerhouse crafted using a traditional Pahadi recipe from the pristine Himalayas. This wholesome, FSSAI-certified snack is expertly roasted in pure mustard oil and seasoned with rock salt, cumin, and dried chilli, making it a perfect high-fibre, gluten-free, and 100% maida-free alternative to greasy, processed snacks. Designed for the health-conscious Indian family, this 200g pack offers a delightful, crunchy wellness treat that pairs beautifully with your evening cup of chai. Add this natural, heritage-inspired superfood snack to your Amazon or Flipkart cart today to effortlessly elevate your daily nutrition and embrace a healthier lifestyle.


## Variation 2: Minimal prompt (no tone guidance)
**Prompt:** Same fields but tone definitions hata di gayi — sirf tone ka naam diya (jaise "Health-Focused"), koi explanation nahi.
**Input:** Barnyard Millet Namkeen / Health-Focused
**Output:** Ditch the guilt of mindless snacking with our premium Barnyard Millet Namkeen, a crispy and nutrient-rich superfood crunch crafted for health-conscious Indian homes. Perfectly dry-roasted to preserve the natural goodness of ancient, fiber-packed barnyard millets, this delicious snack offers a guilt-free, low-glycemic alternative to traditional deep-fried mixtures. Whether you are managing your weight, looking for a diabetic-friendly teatime companion, or packing a wholesome treat for your kids' tiffin, this all-natural namkeen fits seamlessly into your wellness journey. Add this wholesome, preservative-free pack to your Amazon or Flipkart cart today to experience the perfect harmony of authentic Indian spices and modern, mindful nutrition.

## Variation 3: Persona-heavy prompt
**Prompt:** Variation 1 + extra line: "Write as if speaking directly to a busy Amazon shopper scrolling on mobile."
**Input:** Barnyard Millet Namkeen / Health-Focused
**Output:** Ditch the guilt of mindless mid-day snacking with this 100% natural, gluten-free Barnyard Millet Namkeen, crafted specifically for the health-conscious Amazon shopper who refuses to compromise on wellness or taste. Inspired by a traditional Pahadi recipe, this premium, high-fibre snack is roasted to perfection in pure mustard oil and seasoned with rock salt, cumin, and dried chilli, ensuring absolutely zero maida, preservatives, or artificial additives. Whether you are working from home or need a quick, nutritious fuel-up between meetings, this FSSAI-certified, nutrient-dense superfood crunch is the perfect addition to your Flipkart pantry cart. Treat your body to the wholesome goodness of the Himalayas with every single bite of this crunchy, guilt-free delight.



## Result
Variation 1 worked best kyunki explicit tone definitions ne Gemini ko clear guardrails diye, output consistent length mein raha aur Amazon/Flipkart suitability mention karta raha. Variation 2 tone context ke bina generic ho gaya, Variation 3 engaging tha but kabhi kabhi Amazon/Flipkart mention miss kar gaya.

## System prompt / role used
"You are an expert e-commerce copywriter for Indian food products on Amazon and Flipkart."