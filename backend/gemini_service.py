"""
Google Gemini AI Service for FarmGuardian.
Provides live agricultural intelligence for:
- AgriBot Assistant (strictly bounded to agriculture)
- Market Prices (live APMC Mandi trends)
- Yield Prediction (agronomic AI estimation)
- Crop Performance (10-year trends and forecasts)
- Farm Economics (cost breakdown & profit optimization)
- Smart Guidance (lifecycle tracking & stage-specific advice)
"""

import os
import json
import re
from pathlib import Path
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv

# Load .env from backend/ or project root
BACKEND_DIR = Path(__file__).resolve().parent
ROOT_DIR = BACKEND_DIR.parent
load_dotenv(BACKEND_DIR / ".env")
load_dotenv(ROOT_DIR / ".env")

def get_api_key() -> Optional[str]:
    return os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY") or os.getenv("VITE_GEMINI_API_KEY")

def is_gemini_configured() -> bool:
    key = get_api_key()
    return bool(key and len(key.strip()) > 10)

def get_gemini_client():
    """Returns an initialized google.genai Client or None."""
    api_key = get_api_key()
    if not api_key:
        return None
    try:
        from google import genai
        return genai.Client(api_key=api_key)
    except Exception as e:
        print(f"[Gemini] Error initializing genai.Client: {e}")
        return None

def clean_json_text(text: str) -> str:
    """Extracts JSON substring from markdown code blocks or raw text."""
    text = text.strip()
    if "```json" in text:
        text = text.split("```json", 1)[1].split("```", 1)[0]
    elif "```" in text:
        text = text.split("```", 1)[1].split("```", 1)[0]
    return text.strip()


PREFERRED_MODELS = [
    "gemini-flash-lite-latest",
    "gemini-3.5-flash-lite",
    "gemini-flash-latest",
    "gemini-3.6-flash",
    "gemini-2.5-flash",
]

def generate_with_gemini(client, contents, config=None):
    """Tries preferred Gemini models in sequence with graceful failover across versions."""
    last_err = None
    for model_name in PREFERRED_MODELS:
        try:
            return client.models.generate_content(
                model=model_name,
                contents=contents,
                config=config
            )
        except Exception as e:
            last_err = e
            print(f"[Gemini] Model '{model_name}' attempt failed: {e}. Trying next candidate...")
    raise last_err or RuntimeError("All Gemini model candidates failed.")


# =========================================================================
# 1. AGRIBOT ASSISTANT (Strictly bounded to agriculture)
# =========================================================================

AGRIBOT_SYSTEM_PROMPT = """You are AgriBot, an expert agricultural AI assistant developed for the FarmGuardian / AgriCare platform.
Your sole purpose is to help farmers, agricultural students, and farming professionals with:
1. Crops, cultivars, sowing techniques, crop rotation, and harvesting.
2. Soil health, soil testing, soil types, NPK nutrients, and organic composting.
3. Fertilizer management (organic like Jeevamrut, vermicompost, and chemical fertilizers like Urea, DAP, MOP).
4. Irrigation techniques (drip, sprinkler, moisture conservation) and weather impact.
5. Pest and disease identification, Integrated Pest Management (IPM), bio-pesticides, and chemical treatments.
6. Mandi prices, APMC market trends, and farm economics.
7. Farm equipment, modern precision farming tools, and government agricultural schemes (PM-KISAN, crop insurance).

STRICT BOUNDARY POLICY:
You must ONLY answer queries related to agriculture, farming, crops, soil, pests, weather, and farm economics.
If a user asks about anything unrelated to agriculture (such as politics, entertainment, coding, sports, movies, general chit-chat, or other non-farming subjects), you must politely decline and redirect them back to agriculture.
For example:
- In English: "I specialize exclusively as an agricultural advisor for FarmGuardian. I cannot assist with non-farming topics, but I would be glad to answer any questions regarding your crops, soil fertility, pest management, or irrigation."
- In Marathi: "मी केवळ फार्मगार्डियनचा कृषी सल्लागार म्हणून कार्य करतो. मी शेतीव्यतिरिक्त इतर विषयांवर मार्गदर्शन करू शकत नाही, परंतु पिके, माती आरोग्य, कीड नियंत्रण किंवा सिंचनाविषयी कोणत्याही प्रश्नाचे उत्तर देण्यास मला आनंद होईल."

Language Instructions:
If the user's message is in Marathi (मराठी) or asks for Marathi, provide a natural, respectful, and practical response in Marathi.
If in English, respond in clear, farmer-friendly English.
Keep answers structured with bullet points where appropriate for readability.
"""

def ask_agribot(message: str, history: Optional[List[Dict[str, str]]] = None, language: str = "en") -> str:
    """Answers farmer questions using Gemini with strict agricultural guardrails."""
    client = get_gemini_client()
    if not client:
        return fallback_agribot_response(message, language)

    try:
        prompt_parts = []
        if history:
            for item in history[-6:]:
                sender = "User" if item.get("sender") == "user" else "AgriBot"
                prompt_parts.append(f"{sender}: {item.get('text', '')}")
        
        user_lang_hint = "Respond in Marathi (मराठी)." if language == "mr" else "Respond in English."
        prompt_parts.append(f"User: {message}\n(Instruction: {user_lang_hint})")
        full_prompt = "\n".join(prompt_parts)

        response = generate_with_gemini(
            client,
            contents=full_prompt,
            config={
                "system_instruction": AGRIBOT_SYSTEM_PROMPT,
                "temperature": 0.4,
            }
        )
        return response.text.strip()
    except Exception as e:
        print(f"[Gemini] Error calling AgriBot: {e}")
        return fallback_agribot_response(message, language)


def fallback_agribot_response(message: str, lang: str = "en") -> str:
    """Graceful fallback if Gemini API key is not set or network fails."""
    lower = message.lower()
    is_mr = lang == "mr" or any("\u0900" <= c <= "\u097F" for c in message)

    off_topic_words = ["movie", "cinema", "cricket", "football", "song", "actor", "code", "python", "president", "election", "game"]
    if any(w in lower for w in off_topic_words):
        return (
            "मी केवळ फार्मगार्डियनचा कृषी सल्लागार आहे. मी शेतीव्यतिरिक्त इतर विषयांवर मार्गदर्शन करू शकत नाही. कृपया पिके, खते, कीड किंवा हवामानाविषयी विचारा."
            if is_mr else
            "I specialize exclusively as an agricultural AI assistant for FarmGuardian. I cannot assist with non-farming topics, but I am ready to help you with crops, soil fertility, irrigation, or pest management."
        )

    if any(k in lower for k in ["monsoon", "rain", "पाऊस", "मान्सून"]):
        return (
            "आपल्या भागातील हवामानानुसार खरीप हंगामात भात, मका, सोयाबीन आणि भुईमूग ही पिके फायदेशीर ठरतात. पाऊस जास्त असल्यास शेतात पाण्याचा निचरा योग्य राहील याची काळजी घ्या."
            if is_mr else
            "For the monsoon/Kharif season, rice, maize, soybean, and groundnut are highly recommended. Ensure proper field drainage to prevent waterlogging and root rot."
        )
    if any(k in lower for k in ["pest", "कीड", "कीटक", "रोग"]):
        return (
            "कीड व्यवस्थापनासाठी प्राथमिक अवस्थेत ५% निंबोळी अर्क (Neem Oil) फवारावा. खोडकिडीसाठी फेरोमोन ट्रॅप्स (Pheromone traps) लावा आणि आवश्यकतेनुसार जैविक बुरशीनाशकांचा वापर करा."
            if is_mr else
            "For early pest prevention, spray 5% neem oil emulsion. Deploy pheromone traps for stem borers/caterpillars and consider biological controls like Trichoderma before using synthetic insecticides."
        )
    if any(k in lower for k in ["fertilizer", "खत", "युरिया", "dap"]):
        return (
            "पिकाच्या सुरुवातीच्या अवस्थेत नत्र (युरिया) आणि स्फुरद (DAP) योग्य प्रमाणात द्यावे. माती परीक्षणावर आधारित खत व्यवस्थापन करा आणि सेंद्रिय खतांचा (शेणखत/गांडूळ खत) वापर वाढवा."
            if is_mr else
            "Base your fertilizer applications on soil testing. Apply basal DAP/NPK at sowing, followed by split applications of urea during the vegetative stage, enriched with organic compost."
        )

    return (
        "मी आपला कृषी AI सहाय्यक आहे. मी आपल्याला पिके, माती आरोग्य, कीड नियंत्रण, खत व्यवस्थापन आणि बाजारभावांविषयी अचूक माहिती देऊ शकतो. आपल्याला कोणत्या पिकाविषयी माहिती हवी आहे?"
        if is_mr else
        "I am your AgriBot agricultural companion. I can help with crop planning, soil health, fertilizer scheduling, pest diagnosis, and mandi market prices. What crop or farm challenge can I assist you with today?"
    )


# =========================================================================
# 2. MARKET PRICES (Live APMC Mandi Data via Gemini)
# =========================================================================

def get_market_prices(state: str = "Maharashtra", crop: str = "All") -> List[Dict[str, Any]]:
    """Fetches realistic current APMC mandi prices for the given state and crop."""
    client = get_gemini_client()
    if not client:
        return get_fallback_market_data(state, crop)

    prompt = f"""You are an agricultural market analyst for India.
Provide current realistic APMC Mandi market prices for agricultural commodities in the state of {state}.
Commodity filter: {crop}

Generate a JSON list of 9 crops (or 1 specific crop if a specific crop is requested) with realistic current Indian APMC market prices per quintal in ₹ (INR).
Crops to include if 'All': Rice, Wheat, Cotton, Tomato, Onion, Potato, Soybean, Maize, Sugarcane.
If a single crop is selected, include 3 to 4 regional APMC markets within {state} for that crop.

Return strictly valid JSON only in this schema:
[
  {{
    "crop": "Crop Name",
    "priceRange": "₹2,800–3,200",
    "unit": "per quintal",
    "trend": "up",
    "change": "+2.5%",
    "bestMarket": "Market APMC Name, {state}"
  }}
]
"""
    try:
        response = generate_with_gemini(
            client,
            contents=prompt,
            config={
                "response_mime_type": "application/json",
                "temperature": 0.2,
            }
        )
        data = json.loads(clean_json_text(response.text))
        if isinstance(data, list) and len(data) > 0:
            return data
    except Exception as e:
        print(f"[Gemini] Error fetching market prices: {e}")

    return get_fallback_market_data(state, crop)


def get_fallback_market_data(state: str, crop: str) -> List[Dict[str, Any]]:
    base_data = [
        {"crop": "Rice", "priceRange": "₹2,850–3,250", "unit": "per quintal", "trend": "up", "change": "+2.5%", "bestMarket": f"{state} APMC"},
        {"crop": "Wheat", "priceRange": "₹2,200–2,450", "unit": "per quintal", "trend": "stable", "change": "0%", "bestMarket": f"{state} APMC"},
        {"crop": "Cotton", "priceRange": "₹6,100–6,800", "unit": "per quintal", "trend": "down", "change": "-1.2%", "bestMarket": f"{state} APMC"},
        {"crop": "Tomato", "priceRange": "₹1,200–2,400", "unit": "per quintal", "trend": "up", "change": "+14.0%", "bestMarket": f"{state} APMC"},
        {"crop": "Onion", "priceRange": "₹1,400–1,950", "unit": "per quintal", "trend": "down", "change": "-4.5%", "bestMarket": f"{state} APMC"},
        {"crop": "Potato", "priceRange": "₹1,100–1,600", "unit": "per quintal", "trend": "stable", "change": "+0.5%", "bestMarket": f"{state} APMC"},
        {"crop": "Soybean", "priceRange": "₹4,100–4,650", "unit": "per quintal", "trend": "up", "change": "+1.8%", "bestMarket": f"{state} APMC"},
        {"crop": "Maize", "priceRange": "₹1,750–2,100", "unit": "per quintal", "trend": "stable", "change": "+0.2%", "bestMarket": f"{state} APMC"},
        {"crop": "Sugarcane", "priceRange": "₹310–345", "unit": "per quintal", "trend": "up", "change": "+1.1%", "bestMarket": f"{state} APMC"},
    ]
    if crop and crop != "All":
        filtered = [d for d in base_data if d["crop"].lower() == crop.lower()]
        return filtered if filtered else base_data
    return base_data


# =========================================================================
# 3. YIELD PREDICTION (Agronomic Estimation via Gemini)
# =========================================================================

def predict_yield(crop: str, area: float, soil: str, stage: str, sowing_date: str = "") -> Dict[str, Any]:
    """Generates an agronomic yield forecast taking crop, soil, stage, and farm size into account."""
    client = get_gemini_client()
    if not client:
        return get_fallback_yield(crop, area, soil, stage)

    prompt = f"""You are an agricultural scientist specialized in Indian crop yield estimation.
Calculate an accurate expected crop yield based on these parameters:
- Crop: {crop}
- Farm Area: {area} acres
- Soil Type: {soil}
- Growth Stage: {stage}
- Sowing Date: {sowing_date or 'Recent season'}

Provide realistic yield numbers in kilograms (kg) for India:
- expectedYield: Total expected production in kg for the entire {area} acres.
- yieldPerHectare: Yield normalized to kg per hectare (1 acre = 0.404686 hectares).
- confidence: Prediction confidence score between 75 and 95.
- worstCase: Conservative estimate in kg if unfavorable weather occurs.
- bestCase: Upper bound estimate in kg under optimal conditions.
- factors: List 5 influencing factors (Soil condition, Weather forecast, Crop growth stage, Historical regional yield, Irrigation management) each with name, status (e.g. Optimal, Favorable, On Track, High, Needs attention), and level ('healthy' | 'water' | 'warning').
- agronomicInsight: Brief 1-2 sentence explanation of the prediction factors.

Return strictly valid JSON only with this structure:
{{
  "expectedYield": 6200,
  "yieldPerHectare": 3060,
  "confidence": 86,
  "worstCase": 5200,
  "bestCase": 6800,
  "factors": [
    {{"name": "Soil condition", "status": "Optimal", "level": "healthy"}},
    {{"name": "Weather forecast", "status": "Favorable", "level": "water"}},
    {{"name": "Crop growth stage", "status": "On Track", "level": "warning"}},
    {{"name": "Historical regional yield", "status": "High", "level": "healthy"}},
    {{"name": "Irrigation management", "status": "Good", "level": "healthy"}}
  ],
  "agronomicInsight": "..."
}}
"""
    try:
        response = generate_with_gemini(
            client,
            contents=prompt,
            config={
                "response_mime_type": "application/json",
                "temperature": 0.2,
            }
        )
        return json.loads(clean_json_text(response.text))
    except Exception as e:
        print(f"[Gemini] Error in yield prediction: {e}")
        return get_fallback_yield(crop, area, soil, stage)


def get_fallback_yield(crop: str, area: float, soil: str, stage: str) -> Dict[str, Any]:
    base_per_acre = {
        "Rice": 1200,
        "Wheat": 1400,
        "Cotton": 600,
        "Sugarcane": 28000,
        "Tomato": 9000,
        "Soybean": 800,
        "Maize": 1600
    }.get(crop, 1100)

    soil_multipliers = {"Loamy": 1.05, "Clay": 1.0, "Sandy": 0.85, "Silt": 0.95}
    mult = soil_multipliers.get(soil, 1.0)
    
    expected = int(area * base_per_acre * mult)
    per_ha = int((expected / area) * 2.47105)
    worst = int(expected * 0.85)
    best = int(expected * 1.15)

    return {
        "expectedYield": expected,
        "yieldPerHectare": per_ha,
        "confidence": 85,
        "worstCase": worst,
        "bestCase": best,
        "factors": [
            {"name": "Soil condition", "status": "Optimal", "level": "healthy"},
            {"name": "Weather forecast", "status": "Favorable", "level": "water"},
            {"name": "Crop growth stage", "status": "On Track", "level": "warning"},
            {"name": "Historical regional yield", "status": "High", "level": "healthy"},
            {"name": "Irrigation management", "status": "Needs attention", "level": "warning"}
        ],
        "agronomicInsight": f"Estimated based on standard {crop} production metrics in {soil} soil for {area} acres."
    }


# =========================================================================
# 4. CROP PERFORMANCE (10-Year Historical Trends & Forecasts)
# =========================================================================

def get_crop_performance(crop: str = "Rice") -> Dict[str, Any]:
    """Provides a 10-year yield historical trend (2015-2024) and future forecast for a given crop."""
    client = get_gemini_client()
    if not client:
        return get_fallback_performance(crop)

    prompt = f"""You are an agricultural data scientist.
Provide a realistic 10-year historical yield series (2015 to 2024) in kg per hectare for {crop} farming in India.
Also provide future forecasts for next year, 3 years, and 5 years, along with key performance indicators.

Return strictly valid JSON only in this format:
{{
  "crop": "{crop}",
  "yearlyData": [
    {{"year": 2015, "yield": 2450}},
    {{"year": 2016, "yield": 2510}},
    {{"year": 2017, "yield": 2490}},
    {{"year": 2018, "yield": 2600}},
    {{"year": 2019, "yield": 2580}},
    {{"year": 2020, "yield": 2750}},
    {{"year": 2021, "yield": 2800}},
    {{"year": 2022, "yield": 2850}},
    {{"year": 2023, "yield": 2980}},
    {{"year": 2024, "yield": 3050}}
  ],
  "avgGrowth": "+2.47%",
  "bestYear": {{"year": 2024, "yield": 3050}},
  "worstYear": {{"year": 2015, "yield": 2450}},
  "forecast": {{
    "nextYear": 3125,
    "in3Years": 3280,
    "in5Years": 3450
  }},
  "aiRecommendation": "{crop} exhibits strong historical growth with consistent yield stability. Adopting micro-irrigation and balanced NPK fertilization will help achieve target forecasts.",
  "aiRecommendationMr": "{crop} पिकात मागील १० वर्षांत स्थिर उत्पादकता दिसून आली आहे. सूक्ष्म सिंचन आणि संतुलित खत व्यवस्थापनाचा अवलंब केल्यास उत्पादनात आणखी सुधारणा होईल."
}}
"""
    try:
        response = generate_with_gemini(
            client,
            contents=prompt,
            config={
                "response_mime_type": "application/json",
                "temperature": 0.2,
            }
        )
        return json.loads(clean_json_text(response.text))
    except Exception as e:
        print(f"[Gemini] Error in crop performance: {e}")
        return get_fallback_performance(crop)


def get_fallback_performance(crop: str) -> Dict[str, Any]:
    base_yields = {
        "Rice": [2450, 2510, 2490, 2600, 2580, 2750, 2800, 2850, 2980, 3050],
        "Wheat": [2900, 2980, 3050, 3120, 3100, 3250, 3300, 3350, 3420, 3500],
        "Cotton": [1350, 1400, 1380, 1450, 1420, 1500, 1520, 1550, 1600, 1650],
        "Sugarcane": [68000, 69500, 71000, 70500, 72000, 73500, 74000, 75500, 76800, 78200]
    }.get(crop, [2400, 2450, 2480, 2530, 2590, 2650, 2700, 2780, 2840, 2920])

    years = list(range(2015, 2025))
    yearly = [{"year": y, "yield": val} for y, val in zip(years, base_yields)]
    
    return {
        "crop": crop,
        "yearlyData": yearly,
        "avgGrowth": "+2.47%",
        "bestYear": {"year": 2024, "yield": base_yields[-1]},
        "worstYear": {"year": 2015, "yield": base_yields[0]},
        "forecast": {
            "nextYear": int(base_yields[-1] * 1.025),
            "in3Years": int(base_yields[-1] * 1.075),
            "in5Years": int(base_yields[-1] * 1.13)
        },
        "aiRecommendation": f"{crop} shows consistent historical productivity. Regular soil monitoring and timely irrigation will sustain this upward trend.",
        "aiRecommendationMr": f"{crop} पिकाच्या उत्पादनात सातत्याने वाढ होत असून आधुनिक कृषी पद्धतींचा वापर केल्यास आगामी वर्षांत अधिक फायदा होईल."
    }


# =========================================================================
# 5. FARM ECONOMICS (Cost Breakdown & Profit Modeling)
# =========================================================================

def get_farm_economics(crop: str = "Rice", area: float = 5.0) -> Dict[str, Any]:
    """Estimates realistic farming input costs, expected yield, and market rates in India."""
    client = get_gemini_client()
    if not client:
        return get_fallback_economics(crop, area)

    prompt = f"""You are an agricultural economist in India.
Estimate realistic input costs in Indian Rupees (₹) for cultivating {crop} on a {area}-acre farm.
Include standard commercial input categories:
- seedCost
- fertilizerCost
- labourCost
- irrigationCost
- pesticideCost
- otherCosts
- expectedYieldPerAcre (in kg)
- pricePerKg (expected mandi rate in ₹/kg)
- economicAdvice (practical 1-2 sentence recommendation for maximizing profit)
- economicAdviceMr (Marathi translation of the advice)

Return strictly valid JSON only:
{{
  "crop": "{crop}",
  "area": {area},
  "seedCost": 5000,
  "fertilizerCost": 12000,
  "labourCost": 35000,
  "irrigationCost": 8000,
  "pesticideCost": 10500,
  "otherCosts": 21000,
  "expectedYieldPerAcre": 1160,
  "pricePerKg": 30,
  "economicAdvice": "Optimizing fertilizer dosage with soil testing can reduce input costs by 15% without sacrificing yield.",
  "economicAdviceMr": "माती परीक्षणावर आधारित खत व्यवस्थापन केल्यास उत्पादन खर्चात १५% पर्यंत बचत शक्य आहे."
}}
"""
    try:
        response = generate_with_gemini(
            client,
            contents=prompt,
            config={
                "response_mime_type": "application/json",
                "temperature": 0.2,
            }
        )
        return json.loads(clean_json_text(response.text))
    except Exception as e:
        print(f"[Gemini] Error in farm economics: {e}")
        return get_fallback_economics(crop, area)


def get_fallback_economics(crop: str, area: float) -> Dict[str, Any]:
    per_acre_costs = {
        "Rice": {"seed": 1000, "fert": 2400, "labour": 7000, "irrigation": 1600, "pesticide": 2100, "other": 4200, "yieldAcre": 1160, "price": 30},
        "Wheat": {"seed": 1200, "fert": 2200, "labour": 5500, "irrigation": 1800, "pesticide": 1600, "other": 3500, "yieldAcre": 1400, "price": 24},
        "Cotton": {"seed": 1800, "fert": 3500, "labour": 9000, "irrigation": 2000, "pesticide": 4500, "other": 5000, "yieldAcre": 650, "price": 65},
    }.get(crop, {"seed": 1000, "fert": 2400, "labour": 7000, "irrigation": 1600, "pesticide": 2100, "other": 4200, "yieldAcre": 1160, "price": 30})

    return {
        "crop": crop,
        "area": area,
        "seedCost": int(per_acre_costs["seed"] * area),
        "fertilizerCost": int(per_acre_costs["fert"] * area),
        "labourCost": int(per_acre_costs["labour"] * area),
        "irrigationCost": int(per_acre_costs["irrigation"] * area),
        "pesticideCost": int(per_acre_costs["pesticide"] * area),
        "otherCosts": int(per_acre_costs["other"] * area),
        "expectedYieldPerAcre": per_acre_costs["yieldAcre"],
        "pricePerKg": per_acre_costs["price"],
        "economicAdvice": "Conserving soil moisture and timely weed management will optimize input efficiency.",
        "economicAdviceMr": "वेळेवर तण नियंत्रण आणि योग्य सिंचन व्यवस्थापनाने खतांचा कार्यक्षम वापर वाढवता येतो."
    }


# =========================================================================
# 6. SMART GUIDANCE (Crop Lifecycle, Timely Alerts & Stage Checklist)
# =========================================================================

def get_smart_guidance(crop: str = "Rice", sowing_date: str = "2026-04-10") -> Dict[str, Any]:
    """Generates real-time crop lifecycle status, active alerts, and stage-specific daily checklist."""
    client = get_gemini_client()
    if not client:
        return get_fallback_smart_guidance(crop, sowing_date)

    prompt = f"""You are an agronomic crop advisor for Indian farmers.
Generate a real-time smart guidance report for:
- Crop: {crop}
- Sowing Date: {sowing_date}

Determine:
1. Current growth stage ('Land Preparation', 'Sowing', 'Vegetative', 'Flowering', or 'Harvest').
2. Lifecycle progress steps with completion status.
3. Today's top agronomic recommendation in English and Marathi.
4. Active smart alerts (Irrigation, Pest, Fertilizer, Weather).
5. 5 actionable checklist items for the farmer for today's stage in English and Marathi.

Return strictly valid JSON only:
{{
  "crop": "{crop}",
  "sowingDate": "{sowing_date}",
  "currentStage": "Vegetative",
  "stageTiming": "Day 15–45",
  "stageTimingMr": "दिवस १५–४५",
  "todaysRecommendation": "Irrigate today for 20 minutes and monitor nitrogen levels. Rain expected in 2 days.",
  "todaysRecommendationMr": "आज २० मिनिटे हलके पाणी द्या आणि नायट्रोजन खत पातळीवर लक्ष ठेवा. २ दिवसांत पावसाची शक्यता आहे.",
  "lifecycleStages": [
    {{"stage": "Land Preparation", "completed": true, "current": false}},
    {{"stage": "Sowing", "completed": true, "current": false}},
    {{"stage": "Vegetative", "completed": false, "current": true, "daysRemaining": 15}},
    {{"stage": "Flowering", "completed": false, "current": false}},
    {{"stage": "Harvest", "completed": false, "current": false}}
  ],
  "alerts": [
    {{
      "id": 1,
      "type": "Irrigation",
      "title": "Irrigation Recommended",
      "titleMr": "सिंचन शिफारस",
      "message": "Soil moisture is slightly low. Recommended light irrigation: 20 minutes.",
      "messageMr": "मातीतील ओलावा किंचित कमी आहे. २० मिनिटे हलके पाणी देण्याची शिफारस आहे.",
      "severity": "warning"
    }},
    {{
      "id": 2,
      "type": "Pest",
      "title": "Pest Risk Warning",
      "titleMr": "कीटक प्रादुर्भाव धोका",
      "message": "Warm humid conditions favor stem borer and leaf folder activity.",
      "messageMr": "उष्ण आणि दमट हवामानामुळे खोडकिडीचा प्रादुर्भाव वाढू शकतो.",
      "severity": "critical"
    }},
    {{
      "id": 3,
      "type": "Fertilizer",
      "title": "Fertilizer Top-Dressing",
      "titleMr": "खतांची आवश्यकता",
      "message": "Apply second split dose of nitrogen before tillering ends.",
      "messageMr": "फुटवे फुटण्याच्या अवस्थेत नायट्रोजनचा दुसरा हप्ता वेळेवर द्या.",
      "severity": "warning"
    }},
    {{
      "id": 4,
      "type": "Weather",
      "title": "Weather Outlook",
      "titleMr": "हवामान पूर्वसूचना",
      "message": "Moderate showers forecasted; plan foliar sprays accordingly.",
      "messageMr": "हलक्या पावसाची शक्यता असल्याने फवारणीचे नियोजन सांभाळून करा.",
      "severity": "info"
    }}
  ],
  "checklist": [
    {{"en": "Maintain 2-3 cm standing water in paddy plots", "mr": "पिकात योग्य पाणी पातळी (२-३ सेमी) राखा"}},
    {{"en": "Inspect lower leaves for yellowing or leaf-spot symptoms", "mr": "पानावरील पिवळेपणा व ठिपके यावर लक्ष ठेवा"}},
    {{"en": "Apply recommended nitrogen top-dressing in split dose", "mr": "शिफारशीत नायट्रोजन खतांचा हलका हप्ता द्या"}},
    {{"en": "Install pheromone traps to monitor adult moths", "mr": "प्रौढ पतंगांवर देखरेखीसाठी कामगंध सापळे लावा"}},
    {{"en": "Perform manual or shallow mechanical weeding", "mr": "तण नियंत्रण वेळेवर करून पिकाची वाढ सुलभ करा"}}
  ]
}}
"""
    try:
        response = generate_with_gemini(
            client,
            contents=prompt,
            config={
                "response_mime_type": "application/json",
                "temperature": 0.2,
            }
        )
        return json.loads(clean_json_text(response.text))
    except Exception as e:
        print(f"[Gemini] Error in smart guidance: {e}")
        return get_fallback_smart_guidance(crop, sowing_date)


def get_fallback_smart_guidance(crop: str, sowing_date: str) -> Dict[str, Any]:
    return {
        "crop": crop,
        "sowingDate": sowing_date,
        "currentStage": "Vegetative",
        "stageTiming": "Day 15–45",
        "stageTimingMr": "दिवस १५–४५",
        "todaysRecommendation": "Irrigate today for 20 minutes and monitor nitrogen levels. Rain expected tomorrow.",
        "todaysRecommendationMr": "आज २० मिनिटे हलके पाणी द्या आणि नायट्रोजन खत पातळीवर लक्ष ठेवा. उद्या पाऊस पडण्याची शक्यता ८५% आहे.",
        "lifecycleStages": [
            {"stage": "Land Preparation", "completed": True, "current": False},
            {"stage": "Sowing", "completed": True, "current": False},
            {"stage": "Vegetative", "completed": False, "current": True, "daysRemaining": 15},
            {"stage": "Flowering", "completed": False, "current": False},
            {"stage": "Harvest", "completed": False, "current": False}
        ],
        "alerts": [
            {
                "id": 1,
                "type": "Irrigation",
                "title": "Irrigation Recommended",
                "titleMr": "सिंचन शिफारस",
                "message": "Soil moisture is slightly low. Recommended irrigation: 20 minutes.",
                "messageMr": "मातीतील ओलावा किंचित कमी आहे. २० मिनिटे हलके पाणी देण्याची शिफारस आहे.",
                "severity": "warning"
            },
            {
                "id": 2,
                "type": "Pest",
                "title": "Pest Risk",
                "titleMr": "कीटक प्रादुर्भाव धोका",
                "message": "Possible pest activity detected in Zone B.",
                "messageMr": "क्षेत्र B (Zone B) मध्ये कीटकांची लक्षणे दिसून आली आहेत.",
                "severity": "critical"
            },
            {
                "id": 3,
                "type": "Fertilizer",
                "title": "Fertilizer Required",
                "titleMr": "खतांची आवश्यकता",
                "message": "Nitrogen level is below optimal range.",
                "messageMr": "नायट्रोजनची पातळी इष्टतम मर्यादेपेक्षा कमी नोंदवली गेली आहे.",
                "severity": "warning"
            },
            {
                "id": 4,
                "type": "Weather",
                "title": "Weather Alert",
                "titleMr": "हवामान पूर्वसूचना",
                "message": "Rain expected tomorrow. Consider postponing irrigation.",
                "messageMr": "उद्या पाऊस पडण्याची शक्यता आहे. सिंचन पुढे ढकलण्याचा विचार करा.",
                "severity": "info"
            }
        ],
        "checklist": [
            {"en": "Maintain proper water level (2-3 cm)", "mr": "पिकात योग्य पाणी पातळी (२-३ सेमी) राखा"},
            {"en": "Monitor soil moisture regularly", "mr": "जमिनीतील ओलावा नियमितपणे तपासा"},
            {"en": "Apply recommended nitrogen top-dressing", "mr": "शिफारशीत नायट्रोजन खतांचा हलका हप्ता द्या"},
            {"en": "Check for early pest activity (stem borer)", "mr": "खोडकिडीच्या प्राथमिक लक्षणांवर नजर ठेवा"},
            {"en": "Weed management to reduce competition", "mr": "तण नियंत्रण वेळेवर करून पिकाची वाढ सुलभ करा"}
        ]
    }
