"""
Comprehensive Disease Knowledge Base for all 38 PlantVillage classes.
Provides agronomic details, symptoms, risk factors, and actionable recommendations
in English and Marathi for integration with FarmGuardian.
"""

DISEASE_INFO = {
    "Apple___Apple_scab": {
        "display_name": "Apple — Apple Scab",
        "plant": "Apple",
        "disease": "Apple Scab",
        "is_healthy": False,
        "risk_level": "HIGH",
        "symptoms": [
            "Olive-green to brown velvety lesions on upper leaf surfaces",
            "Puckered, twisted leaves with yellowing margins",
            "Premature defoliation in severe outbreaks",
            "Scabby, cork-like cracked lesions on developing fruits"
        ],
        "risk_factors": [
            "Prolonged leaf wetness (>9 hours from rain or dew)",
            "Moderate spring temperatures between 13°C and 24°C",
            "Dense tree canopy impeding air circulation and drying",
            "Overwintered leaf litter harboring fungal ascospores"
        ],
        "recommendations": [
            "Apply protective captan or copper-based fungicides starting at green tip stage",
            "Rake and destroy fallen leaves in autumn to eliminate overwintering spores",
            "Prune inner canopy branches to maximize airflow and sunlight penetration",
            "Choose scab-resistant apple cultivars for future planting (e.g., Liberty, Enterprise)"
        ],
        "marathi": {
            "display_name": "सफरचंद — खवले रोग (Apple Scab)",
            "plant": "सफरचंद",
            "disease": "खवले रोग (Scab)",
            "symptoms": [
                "पानांवर ऑलिव्ह-हिरवे किंवा तपकिरी मखमली चट्टे दिसणे",
                "पाने आकसणे व कडा पिवळ्या पडणे",
                "गंभीर प्रादुर्भावात पाने अकाली गळणे",
                "फळांवर खवल्यासारखे भेगाळलेले डाग पडणे"
            ],
            "recommendations": [
                "हिरव्या कोंबांच्या अवस्थेत कॉपर किंवा कॅप्टन बुरशीनाशकाची फवारणी करावी",
                "झाडाखाली पडलेली रोगट पाने गोळा करून नष्ट करावीत",
                "झाडाची योग्य छाटणी करून सूर्यप्रकाश व हवा खेळती ठेवावी",
                "रोगप्रतिकारक जातींची लागवड करण्यास प्राधान्य द्यावे"
            ]
        }
    },
    "Apple___Black_rot": {
        "display_name": "Apple — Black Rot",
        "plant": "Apple",
        "disease": "Black Rot",
        "is_healthy": False,
        "risk_level": "CRITICAL",
        "symptoms": [
            "Circular frogeye leaf spots with purple margins and tan centers",
            "Black rotting fruit mummies hanging on branches or fallen below",
            "Sunken reddish-brown cankers on twigs and main limbs",
            "Premature yellowing and foliage drop"
        ],
        "risk_factors": [
            "Warm temperatures (26–32°C) combined with high humidity",
            "Presence of dead wood, fire blight cankers, or mummified fruit",
            "Bark injuries from hail, pruning, or insect feeding",
            "Weakened or stressed orchard trees"
        ],
        "recommendations": [
            "Prune out dead wood, cankers, and remove all mummified fruits during dormancy",
            "Disinfect pruning shears with 70% isopropyl alcohol between cuts",
            "Apply thiophanate-methyl or captan fungicide from pink bud through petal fall",
            "Maintain comprehensive orchard sanitation and bury or burn pruned infected wood"
        ],
        "marathi": {
            "display_name": "सफरचंद — काळी कूज (Black Rot)",
            "plant": "सफरचंद",
            "disease": "काळी कूज (Black Rot)",
            "symptoms": [
                "पानांवर जांभळट कडा असलेले गोलाकार चट्टे पडणे",
                "फळे काळी पडून सुकणे आणि झाडावर लटकून राहणे",
                "फांद्यांवर खोलगट तपकिरी व्रण तयार होणे",
                "पाने पिवळी पडून अकाली गळणे"
            ],
            "recommendations": [
                "सुकलेल्या फांद्या आणि रोगट फळे छाटून नष्ट करावीत",
                "छाटणीची अवजारे जंतुनाशकाने निर्जंतुक करावीत",
                "शिफारस केलेल्या बुरशीनाशकाची योग्य वेळी फवारणी करावी",
                "बागेत स्वच्छता राखून सूर्यप्रकाश पुरेशा प्रमाणात मिळेल याची काळजी घ्यावी"
            ]
        }
    },
    "Apple___Cedar_apple_rust": {
        "display_name": "Apple — Cedar Apple Rust",
        "plant": "Apple",
        "disease": "Cedar Apple Rust",
        "is_healthy": False,
        "risk_level": "MODERATE",
        "symptoms": [
            "Bright orange-yellow circular spots on upper leaf surfaces",
            "Tiny black fruiting specks inside the orange leaf lesions",
            "Tube-like fungal structures under leaf spots producing powdery spores",
            "Yellow-orange blemishes on developing fruit"
        ],
        "risk_factors": [
            "Nearby Eastern red cedar or juniper trees acting as alternate hosts",
            "Wet spring weather with temperatures between 10°C and 24°C",
            "Frequent rainfall events during apple bud break and bloom"
        ],
        "recommendations": [
            "Remove alternate host juniper/cedar trees within a 1-2 mile radius if possible",
            "Apply myclobutanil or mancozeb fungicide from tight cluster through petal fall",
            "Select resistant cultivars such as Liberty, Freedom, or Williams Pride",
            "Monitor nearby junipers for orange gelatinous galls in early spring"
        ],
        "marathi": {
            "display_name": "सफरचंद — तांबेरा रोग (Cedar Apple Rust)",
            "plant": "सफरचंद",
            "disease": "तांबेरा रोग (Rust)",
            "symptoms": [
                "पानांच्या वरच्या भागावर चमकदार केशरी-पिवळे डाग पडणे",
                "डागांच्या मध्यभागी काळे सूक्ष्म ठिपके दिसणे",
                "पानांच्या खालील भागातून भुकटीसारखे बीजाणू बाहेर पडणे",
                "फळांवर पिवळसर-केशरी चट्टे उमटणे"
            ],
            "recommendations": [
                "बागेजवळील पर्यायी यजमान वनस्पती नष्ट कराव्यात",
                "फुलधारणेच्या वेळी मॅन्कोझेबयुक्त बुरशीनाशकाची फवारणी करावी",
                "तांबेरा प्रतिकारक सफरचंद जातींची लागवड करावी",
                "वसंत ऋतूत झाडांची नियमित पाहणी करावी"
            ]
        }
    },
    "Apple___healthy": {
        "display_name": "Apple — Healthy",
        "plant": "Apple",
        "disease": "Healthy",
        "is_healthy": True,
        "risk_level": "NONE",
        "symptoms": [
            "Vibrant green, uniform foliage with intact margins",
            "No necrotic spotting, chlorosis, or fungal lesions",
            "Sturdy shoots with active apical growth and healthy buds",
            "Smooth fruit skin with no blemish or rot"
        ],
        "risk_factors": [
            "Normal seasonal orchard environmental conditions"
        ],
        "recommendations": [
            "Maintain balanced N-P-K fertilization according to annual soil test results",
            "Ensure regular drip irrigation during active growth and fruit sizing",
            "Perform scheduled dormant and canopy pruning to optimize ventilation",
            "Conduct routine weekly scouting for early detection of pests or diseases"
        ],
        "marathi": {
            "display_name": "सफरचंद — निरोगी (Healthy)",
            "plant": "सफरचंद",
            "disease": "निरोगी",
            "symptoms": [
                "पाने निरोगी, चमकदार हिरवी व अखंड कडा असलेली",
                "कोणत्याही रोगाचे किंवा बुरशीचे डाग नाहीत",
                "फांद्यांची वाढ जोमदार व निरोगी",
                "फळांचा विकास सामान्य व चांगला"
            ],
            "recommendations": [
                "माती परीक्षणानुसार संतुलित खतांचा वापर सुरू ठेवावा",
                "ठिबक सिंचनाद्वारे पाण्याचे योग्य व्यवस्थापन राखावे",
                "हवा व प्रकाशासाठी झाडाची नियमित छाटणी करावी",
                "कीड व रोगांच्या प्रतिबंधासाठी नियमित देखरेख ठेवावी"
            ]
        }
    },
    "Blueberry___healthy": {
        "display_name": "Blueberry — Healthy",
        "plant": "Blueberry",
        "disease": "Healthy",
        "is_healthy": True,
        "risk_level": "NONE",
        "symptoms": [
            "Glossy, uniform deep green leaves",
            "No leaf discoloration, marginal scorching, or fungal spots",
            "Strong cane vigor with productive fruiting laterals",
            "Healthy root system and abundant berry clusters"
        ],
        "risk_factors": [
            "Monitor soil pH to ensure it stays in the optimal 4.5–5.5 acidic range"
        ],
        "recommendations": [
            "Maintain soil pH between 4.5 and 5.5 using elemental sulfur if necessary",
            "Apply organic pine bark or sawdust mulch to conserve moisture and acidify soil",
            "Provide regular drip irrigation to keep root zone evenly moist without saturation",
            "Scout for spotted wing drosophila during berry ripening"
        ],
        "marathi": {
            "display_name": "ब्लूबेरी — निरोगी (Healthy)",
            "plant": "ब्लूबेरी",
            "disease": "निरोगी",
            "symptoms": [
                "पाने चमकदार व गडद हिरवीगार",
                "पानांवर कसलेही डाग किंवा पिवळेपणा नाही",
                "झुडपांची वाढ जोमदार",
                "फळांचे पोषण योग्य प्रकारे होत आहे"
            ],
            "recommendations": [
                "जमिनीचा सामू (pH) ४.५ ते ५.५ दरम्यान ठेवावा",
                "सेंद्रिय आच्छादनाचा (मल्चिंग) वापर करावा",
                "ठिबक सिंचनाने मुळांपाशी ओलावा टिकवून ठेवावा",
                "फळे पिकण्याच्या काळात किडींवर लक्ष ठेवावे"
            ]
        }
    },
    "Cherry_(including_sour)___Powdery_mildew": {
        "display_name": "Cherry — Powdery Mildew",
        "plant": "Cherry",
        "disease": "Powdery Mildew",
        "is_healthy": False,
        "risk_level": "MODERATE",
        "symptoms": [
            "White to light grey powdery fungal coating on leaf surfaces",
            "Upward curling and cupping of young expanding leaves",
            "Stunted terminal shoot growth and distorted leaves",
            "Fruit surface blemishes, russeting, and poor market quality"
        ],
        "risk_factors": [
            "High relative humidity combined with dry leaf surfaces",
            "Dense canopy with shade and stagnant air pockets",
            "Moderate temperatures (15–28°C)",
            "Excessive nitrogen fertilizer promoting lush, succulent shoot flushes"
        ],
        "recommendations": [
            "Apply wettable sulfur, myclobutanil, or potassium bicarbonate at petal fall",
            "Prune canopy vigorously to enhance interior sunlight and airflow",
            "Avoid late summer high-nitrogen applications",
            "Remove severely mildewed terminal shoots during routine orchard inspection"
        ],
        "marathi": {
            "display_name": "चेरी — भुरी रोग (Powdery Mildew)",
            "plant": "चेरी",
            "disease": "भुरी रोग (Powdery Mildew)",
            "symptoms": [
                "पानांवर पांढऱ्या किंवा राखाडी रंगाची भुकटी दिसणे",
                "कोवळी पाने वरच्या बाजूला वाकणे व आकसणे",
                "नवीन शेंड्यांची वाढ खुंटणे",
                "फळांवर डाग पडून प्रत खालावणे"
            ],
            "recommendations": [
                "गंधक किंवा पोटॅशियम बायकार्बोनेटची वेळीच फवारणी करावी",
                "झाडांची छाटणी करून हवा व सूर्यप्रकाश वाढवावा",
                "जास्त नत्राचा वापर टाळावा",
                "प्रादुर्भाव झालेले शेंडे कापून नष्ट करावेत"
            ]
        }
    },
    "Cherry_(including_sour)___healthy": {
        "display_name": "Cherry — Healthy",
        "plant": "Cherry",
        "disease": "Healthy",
        "is_healthy": True,
        "risk_level": "NONE",
        "symptoms": [
            "Dark green, smooth leaves with intact serrated borders",
            "Vigorous shoot growth with strong terminal buds",
            "Clean bark without gummosis or cankers",
            "Uniform fruit set and healthy fruit clusters"
        ],
        "risk_factors": [
            "Standard orchard environmental conditions"
        ],
        "recommendations": [
            "Maintain consistent drip irrigation without wetting foliage",
            "Apply balanced fertilizer after harvest to support next season's bud formation",
            "Inspect weekly for cherry fruit flies and aphids during growing season",
            "Maintain a weed-free buffer beneath the tree drip line"
        ],
        "marathi": {
            "display_name": "चेरी — निरोगी (Healthy)",
            "plant": "चेरी",
            "disease": "निरोगी",
            "symptoms": [
                "पाने निरोगी, चमकदार हिरवी",
                "खोडावर कोणताही डिंक किंवा व्रण नाही",
                "झाडाची वाढ संतुलित व जोमदार",
                "फळांचा विकास उत्तम"
            ],
            "recommendations": [
                "ठिबक सिंचनाचा वापर करून पाने कोरडी ठेवावीत",
                "कापणीनंतर संतुलित सेंद्रिय खते द्यावीत",
                "फळमाशी व मावा किडींवर नियमित लक्ष ठेवावे",
                "झाडाभोवती तण नियंत्रण ठेवावे"
            ]
        }
    },
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": {
        "display_name": "Corn — Gray Leaf Spot",
        "plant": "Corn (Maize)",
        "disease": "Gray Leaf Spot",
        "is_healthy": False,
        "risk_level": "HIGH",
        "symptoms": [
            "Rectangular, blocky tan-to-gray lesions strictly delimited by leaf veins",
            "Lesions coalescing into large necrotic dead leaf zones",
            "Premature leaf desiccation and stalk lodging",
            "Reduced grain fill and light test weight at harvest"
        ],
        "risk_factors": [
            "Extended high relative humidity (>90%) with warm temperatures (25–32°C)",
            "Continuous corn cropping with minimum or no-tillage residue retention",
            "Dense canopy populations limiting air movement"
        ],
        "recommendations": [
            "Apply strobilurin or triazole fungicides (e.g., azoxystrobin) at VT/R1 stage",
            "Rotate fields with non-host crops such as soybeans or pulses",
            "Chop and incorporate infested corn residue to promote biological breakdown",
            "Plant corn hybrid varieties with certified Gray Leaf Spot tolerance"
        ],
        "marathi": {
            "display_name": "मका — राखाडी करपा (Gray Leaf Spot)",
            "plant": "मका",
            "disease": "राखाडी करपा (Gray Leaf Spot)",
            "symptoms": [
                "पानांच्या शिरांच्या दरम्यान आयताकृती राखाडी-तपकिरी चट्टे पडणे",
                "चट्टे एकत्र येऊन पाने मोठ्या प्रमाणावर जळणे",
                "मक्याचे ताट कमकुवत होऊन पडणे",
                "दाणे भरण्याचे प्रमाण कमी होणे"
            ],
            "recommendations": [
                "फुलकिडे व फुलोरा अवस्थेत योग्य बुरशीनाशकाची फवारणी करावी",
                "सोयाबीन किंवा कडधान्य पिकांसोबत फेरपालट करावी",
                "रोगट अवशेषांची नांगरट करून ते जमिनीत पुरावेत",
                "रोगप्रतिकारक संकरित बियाण्यांची निवड करावी"
            ]
        }
    },
    "Corn_(maize)___Common_rust_": {
        "display_name": "Corn — Common Rust",
        "plant": "Corn (Maize)",
        "disease": "Common Rust",
        "is_healthy": False,
        "risk_level": "MODERATE",
        "symptoms": [
            "Small, circular to elongate reddish-brown pustules on both leaf surfaces",
            "Pustules rupturing the leaf epidermis to release powdery cinnamon-brown spores",
            "Yellow chlorotic rings surrounding pustules",
            "Premature leaf drying when rust pustules cover extensive leaf area"
        ],
        "risk_factors": [
            "Cool to moderate temperatures (16–25°C)",
            "High relative humidity and heavy dew lasting over 6 hours",
            "Late planting exposing young crops to peak airborne spore dispersal"
        ],
        "recommendations": [
            "Apply foliar fungicide (pyraclostrobin or tebuconazole) if rust reaches ear leaves early",
            "Select corn hybrids containing specific Rp resistance genes",
            "Plant early in the season to evade heavy airborne rust migrations",
            "Scout upper leaves weekly during tassel and silking periods"
        ],
        "marathi": {
            "display_name": "मका — तांबेरा रोग (Common Rust)",
            "plant": "मका",
            "disease": "तांबेरा रोग (Common Rust)",
            "symptoms": [
                "पानांच्या दोन्ही बाजूंवर लालसर-तपकिरी रंगाचे लहान फोड येणे",
                "फोड फुटून दालचिनीसारखी भुकटी बाहेर पडणे",
                "फोडांभोवती पिवळे कडे तयार होणे",
                "तीव्र प्रादुर्भावात पाने सुकणे"
            ],
            "recommendations": [
                "तांबेरा दिसताच टेबुकोनाझोलयुक्त बुरशीनाशकाची फवारणी करावी",
                "रोगप्रतिकारक वाणांची निवड करावी",
                "हंगामाच्या सुरुवातीलाच वेळेवर पेरणी करावी",
                "कणसे भरण्याच्या काळात नियमित पाहणी करावी"
            ]
        }
    },
    "Corn_(maize)___Northern_Leaf_Blight": {
        "display_name": "Corn — Northern Leaf Blight",
        "plant": "Corn (Maize)",
        "disease": "Northern Leaf Blight",
        "is_healthy": False,
        "risk_level": "HIGH",
        "symptoms": [
            "Large, elliptical cigar-shaped grayish-green to tan lesions (2.5 to 15 cm long)",
            "Dark velvety fungal sporulation on lesions during wet weather",
            "Extensive leaf blighting starting from lower canopy moving upwards",
            "Substantial reduction in ear size and grain yield"
        ],
        "risk_factors": [
            "Moderate temperatures (18–27°C) accompanied by frequent rains",
            "Prolonged morning dew periods (>8 hours)",
            "High amount of surface crop residue from previous corn season"
        ],
        "recommendations": [
            "Rotate crops with non-grasses for 1-2 years to deplete soil inoculum",
            "Apply labeled triazole or strobilurin fungicides at silking if threshold is reached",
            "Plant corn hybrids with Ht gene resistance against Exserohilum turcicum",
            "Till infected residue under in high-risk fields to speed up decomposition"
        ],
        "marathi": {
            "display_name": "मका — उत्तर करपा (Northern Leaf Blight)",
            "plant": "मका",
            "disease": "उत्तर करपा (Northern Leaf Blight)",
            "symptoms": [
                "पानांवर लांबट सिगारच्या आकाराचे राखाडी-हिरवट मोठे चट्टे दिसणे",
                "दमट हवेत चट्ट्यांवर काळसर बुरशीची वाढ दिसणे",
                "खालची पाने जळून रोग वरच्या पानांवर पसरणे",
                "कणसांचा आकार लहान राहून उत्पन्नात घट होणे"
            ],
            "recommendations": [
                "१-२ वर्षे कडधान्य किंवा इतर पिकांची फेरपालट करावी",
                "कणसे येण्याच्या वेळी शिफारस केलेले बुरशीनाशक फवारावे",
                "करपा प्रतिकारक संकरित वाण वापरावेत",
                "रोगट अवशेष जमिनीत गाडून नष्ट करावेत"
            ]
        }
    },
    "Corn_(maize)___healthy": {
        "display_name": "Corn — Healthy",
        "plant": "Corn (Maize)",
        "disease": "Healthy",
        "is_healthy": True,
        "risk_level": "NONE",
        "symptoms": [
            "Broad, rich green leaves with prominent clean midribs",
            "Thick, upright stalk with well-developed anchor brace roots",
            "No foliar pustules, stripes, or necrotic lesions",
            "Uniform ear development with full silk emergence"
        ],
        "risk_factors": [
            "Standard field agronomic conditions"
        ],
        "recommendations": [
            "Apply split nitrogen doses at V4 and V8 vegetative stages",
            "Ensure consistent soil moisture during critical silking and grain filling",
            "Scout for fall armyworm and stem borer larvae periodically",
            "Maintain effective weed management between crop rows"
        ],
        "marathi": {
            "display_name": "मका — निरोगी (Healthy)",
            "plant": "मका",
            "disease": "निरोगी",
            "symptoms": [
                "पाने रुंद, गर्द हिरवी व ताजी",
                "मक्याचे ताट मजबूत व सरळ वाढलेले",
                "कोणत्याही प्रकारचा करपा किंवा कीड नाही",
                "कणसांचा विकास निरोगी व चांगला"
            ],
            "recommendations": [
                "वाढीच्या अवस्थेनुसार नत्राचा योग्य हप्ता द्यावा",
                "कणसात दाणे भरताना पाण्याचा ताण पडू देऊ नये",
                "लष्करी अळीवर नियमित लक्ष ठेवावे",
                "ओळींमधील तणांचा वेळेवर बंदोबस्त करावा"
            ]
        }
    },
    "Grape___Black_rot": {
        "display_name": "Grape — Black Rot",
        "plant": "Grape",
        "disease": "Black Rot",
        "is_healthy": False,
        "risk_level": "HIGH",
        "symptoms": [
            "Small circular reddish-brown leaf spots with dark brown margins",
            "Tiny black pimple-like fruiting bodies (pycnidia) arranged in rings inside spots",
            "Berries turning brown, shriveling into hard, wrinkled black mummies",
            "Black elliptical cankers on shoots, tendrils, and petioles"
        ],
        "risk_factors": [
            "Warm, rainy conditions (21–27°C)",
            "Mummified berries left hanging on trellis wires or on vineyard floor",
            "Dense canopy shading inner fruit clusters and preventing fast drying"
        ],
        "recommendations": [
            "Prune out and destroy all mummies and infected canes during winter pruning",
            "Apply protectant fungicides (mancozeb, captan, or tebuconazole) starting at 1-inch shoot growth",
            "Practice aggressive shoot positioning and leaf pulling to expose fruit clusters",
            "Maintain weed-free vine strips below trellis wires to promote air flow"
        ],
        "marathi": {
            "display_name": "द्राक्ष — काळी कूज (Black Rot)",
            "plant": "द्राक्ष",
            "disease": "काळी कूज (Black Rot)",
            "symptoms": [
                "पानांवर लालसर-तपकिरी गोलाकार चट्टे पडणे",
                "चट्ट्यांमध्ये काळे लहान ठिपके गोलाकार रचनेत दिसणे",
                "मणी काळे पडून सुकणे आणि सुरकुत्या पडून वाळणे",
                "वेलींच्या कोवळ्या फांद्यांवर काळे व्रण उमटणे"
            ],
            "recommendations": [
                "छाटणीच्या वेळी सुकलेले मणी व रोगट काड्या काढून जाळाव्यात",
                "कोंब फुटण्याच्या सुरुवातीला मॅन्कोझेब किंवा इतर बुरशीनाशक फवारावे",
                "घडांभोवती हवा खेळती राहण्यासाठी पाने विरळ करावीत",
                "वेलींखालील तण काढून स्वच्छता ठेवावी"
            ]
        }
    },
    "Grape___Esca_(Black_Measles)": {
        "display_name": "Grape — Esca (Black Measles)",
        "plant": "Grape",
        "disease": "Esca (Black Measles)",
        "is_healthy": False,
        "risk_level": "CRITICAL",
        "symptoms": [
            "Interveinal chlorosis and necrosis creating distinct 'tiger stripe' pattern on leaves",
            "Small dark-purple to black flecks or speckling on berries ('measles')",
            "Sudden midsummer vine wilting and collapse (apoplexy)",
            "Internal dark discoloration and white spongy rot inside trunk wood"
        ],
        "risk_factors": [
            "Vineyard age older than 7–10 years",
            "Pruning wounds made in wet rainy weather allowing fungal spore penetration",
            "Extreme summer heat stress straining compromised vascular systems"
        ],
        "recommendations": [
            "Prune vines late in the dormant season during dry weather to ensure quick healing",
            "Apply pruning wound sealants or Trichoderma biocontrol immediately after major cuts",
            "Uproot and burn severely infected dying vines to curb fungal transmission",
            "Reduce vine water stress through carefully regulated deficit drip irrigation"
        ],
        "marathi": {
            "display_name": "द्राक्ष — एस्का रोग (Black Measles)",
            "plant": "द्राक्ष",
            "disease": "एस्का / ब्लॅक मिझल्स",
            "symptoms": [
                "पानांवर वाघाच्या पट्ट्यांसारखे (Tiger Stripe) पिवळे-तपकिरी चट्टे दिसणे",
                "द्राक्षाच्या मण्यांवर काळे-जांभळे ठिपके उमटणे",
                "उन्हाळ्यात वेल अचानक कोमेजून वाळणे",
                "खोडाच्या आत लाकूड काळे पडणे व कुजणे"
            ],
            "recommendations": [
                "छाटणी नेहमी कोरड्या हवामानातच करावी",
                "मोठ्या छाटणीच्या जखमांवर बुरशीनाशक किंवा बोर्डो पेस्ट लावावी",
                "अत्यंत रोगट वेली मुळासकट उपटून नष्ट कराव्यात",
                "वेलींना पाण्याचा ताण बसू देऊ नये"
            ]
        }
    },
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": {
        "display_name": "Grape — Leaf Blight (Isariopsis)",
        "plant": "Grape",
        "disease": "Leaf Blight",
        "is_healthy": False,
        "risk_level": "MODERATE",
        "symptoms": [
            "Irregular reddish-brown lesions with distinct yellowish borders on leaves",
            "Dark sooty fungal sporulation on the lower surface of leaf spots",
            "Premature defoliation starting from the lower vine canopy upward",
            "Exposed grape clusters suffering from sunscald and desiccation"
        ],
        "risk_factors": [
            "High humidity accompanied by late-season monsoon rain or overhead misting",
            "Dense, unmanaged canopy with poor air movement",
            "Inadequate soil drainage around grapevine root systems"
        ],
        "recommendations": [
            "Spray copper oxychloride or dithiocarbamate fungicides post-bloom and post-harvest",
            "Perform canopy thinning to facilitate thorough sun drying and fungicide coverage",
            "Rake and compost or burn fallen infected leaves",
            "Avoid overhead irrigation methods; utilize drip irrigation exclusively"
        ],
        "marathi": {
            "display_name": "द्राक्ष — पानांवरील करपा (Isariopsis Leaf Spot)",
            "plant": "द्राक्ष",
            "disease": "पानांवरील करपा",
            "symptoms": [
                "पानांवर लालसर-तपकिरी अनियमित आकाराचे डाग पडणे",
                "पानांच्या खालच्या बाजूला काळसर काजळीसारखी बुरशी दिसणे",
                "खालच्या भागातील पाने गळून पडणे",
                "पाने गळाल्यामुळे घड उन्हाने भाजणे"
            ],
            "recommendations": [
                "कॉपर ऑक्सिक्लोराईडची योग्य अंतराने फवारणी करावी",
                "वेलींची विरळणी करून सूर्यप्रकाश पोहोचवावा",
                "पडलेली पाने गोळा करून नष्ट करावीत",
                "पानांवर पाणी उडणार नाही अशा पद्धतीने ठिबक सिंचन करावे"
            ]
        }
    },
    "Grape___healthy": {
        "display_name": "Grape — Healthy",
        "plant": "Grape",
        "disease": "Healthy",
        "is_healthy": True,
        "risk_level": "NONE",
        "symptoms": [
            "Broad, bright green leaves with intact margins and smooth venation",
            "Robust shoot elongation and healthy active tendrils",
            "Symmetric, clean cluster development without spots or powdery coatings",
            "No scorching, chlorosis, or necrotic patches"
        ],
        "risk_factors": [
            "Standard vineyard climatic fluctuations"
        ],
        "recommendations": [
            "Maintain systematic drip fertigation according to phenological vine stages",
            "Continue canopy management (shoot tucking, shoot thinning, fruit zone leaf removal)",
            "Conduct routine scouting for downy and powdery mildew spore arrival",
            "Maintain clean floor cover crops or herbicide strip under trellises"
        ],
        "marathi": {
            "display_name": "द्राक्ष — निरोगी (Healthy)",
            "plant": "द्राक्ष",
            "disease": "निरोगी",
            "symptoms": [
                "पाने रुंद, टवटवीत व निरोगी हिरवी",
                "वेलींची वाढ जोमदार आणि नवीन पालवी निरोगी",
                "घडांचा विकास एकसारखा व स्वच्छ",
                "कोणत्याही प्रकारचा रोग किंवा बुरशी नाही"
            ],
            "recommendations": [
                "वेलींच्या वाढीनुसार विद्राव्य खतांचे नियोजन करावे",
                "कॅनोपी मॅनेजमेंट (हवा खेळती ठेवणे) योग्य प्रकारे ठेवावे",
                "भुरी व केवडा रोगाच्या सुरुवातीच्या लक्षणांवर लक्ष ठेवावे",
                "बागेत स्वच्छता व तण नियंत्रण ठेवावे"
            ]
        }
    },
    "Orange___Haunglongbing_(Citrus_greening)": {
        "display_name": "Orange — Citrus Greening (Huanglongbing)",
        "plant": "Orange (Citrus)",
        "disease": "Citrus Greening (HLB)",
        "is_healthy": False,
        "risk_level": "CRITICAL",
        "symptoms": [
            "Asymmetric blotchy mottle yellowing across leaf veins on mature leaves",
            "Bright yellow shoots ('yellow dragon') standing out starkly in green canopies",
            "Small, lopsided, sour/bitter fruits that stay green at the stylar blossom end",
            "Extensive branch dieback, feeder root loss, and premature fruit drop"
        ],
        "risk_factors": [
            "Presence and feeding of Asian Citrus Psyllid (Diaphorina citri) vector",
            "Planting or grafting uncertified infected budwood / nursery stock",
            "Warm subtropical climate favoring rapid psyllid reproduction"
        ],
        "recommendations": [
            "Strictly control Asian Citrus Psyllid vectors using systemic insecticides (imidacloprid) or horticultural oils",
            "Promptly eradicate and incinerate confirmed HLB-infected trees to protect orchard",
            "Source all replacement nursery stock exclusively from certified disease-free insect-proof screenhouses",
            "Provide enhanced foliar micronutrient applications (zinc, manganese, iron) to support tree vigor"
        ],
        "marathi": {
            "display_name": "संत्रा — सिट्रस ग्रीनिंग (Huanglongbing)",
            "plant": "संत्रा / मोसंबी",
            "disease": "सिट्रस ग्रीनिंग (HLB)",
            "symptoms": [
                "पानांवर शिरांच्या बाजूने असमान पिवळे चट्टे उमटणे",
                "झाडाच्या शेंड्यांची पाने पिवळी पडून वाढ खुंटणे",
                "फळे लहान, वेडीवाकडी व कडू चवीची होणे आणि खालचा भाग हिरवाच राहणे",
                "फांद्या वाळणे व फळांची अकाली गळ होणे"
            ],
            "recommendations": [
                "सायला (Citrus Psyllid) किडीचा त्वरित कीटकनाशकांनी बंदोबस्त करावा",
                "अतिप्रादुर्भाव झालेली झाडे उपटून जाळावीत जेणेकरून रोग पसरणार नाही",
                "फक्त प्रमाणित व निरोगी नर्सरी रोपांचीच लागवड करावी",
                "झिंक, मँगनीज व लोहयुक्त सूक्ष्म अन्नद्रव्यांची फवारणी करावी"
            ]
        }
    },
    "Peach___Bacterial_spot": {
        "display_name": "Peach — Bacterial Spot",
        "plant": "Peach",
        "disease": "Bacterial Spot",
        "is_healthy": False,
        "risk_level": "HIGH",
        "symptoms": [
            "Angular, water-soaked dark purple lesions on leaves that drop out creating 'shot-holes'",
            "Severe yellowing of affected foliage followed by rapid defoliation",
            "Deep, pitted, cracked lesions on peach fruit often oozing gum",
            "Twig cankers causing shoot tip dieback"
        ],
        "risk_factors": [
            "Warm, windy, wet spring weather (21–27°C)",
            "Sandy soils coupled with windblown sand causing micro-wounds on leaves",
            "Excessive spring nitrogen fertilization creating succulent tissue"
        ],
        "recommendations": [
            "Apply preventive low-rate copper bactericides or oxytetracycline from shuck split onward",
            "Avoid overhead irrigation that splashes bacterial cells onto foliage",
            "Prune out infected twig cankers during annual winter dormant pruning",
            "Plant resistant peach cultivars (e.g., Candor, Dixired, Clayton)"
        ],
        "marathi": {
            "display_name": "पीच — जिवाणू ठिपके (Bacterial Spot)",
            "plant": "पीच (सप्ताळू)",
            "disease": "जिवाणू ठिपके (Bacterial Spot)",
            "symptoms": [
                "पानांवर जांभळट ठिपके पडणे व ते गळून पानांना छिद्रे पडणे (Shot-hole)",
                "पाने पिवळी पडून मोठ्या प्रमाणावर गळणे",
                "फळांवर भेगा पडून डिंक बाहेर येणे",
                "कोवळ्या फांद्यांवर व्रण पडून शेंडे वाळणे"
            ],
            "recommendations": [
                "फुलोरा गळाल्यानंतर कॉपरयुक्त जिवाणूनाशकाची फवारणी करावी",
                "पानांवर पाणी उडेल असे सिंचन टाळावे",
                "रोगट फांद्या हिवाळ्यात छाटून नष्ट कराव्यात",
                "रोगप्रतिकारक जातींची लागवड करावी"
            ]
        }
    },
    "Peach___healthy": {
        "display_name": "Peach — Healthy",
        "plant": "Peach",
        "disease": "Healthy",
        "is_healthy": True,
        "risk_level": "NONE",
        "symptoms": [
            "Vibrant lanceolate green leaves with clean, intact margins",
            "Smooth bark without oozing gummosis or sunken cankers",
            "Healthy fruit sizing with intact velvet fuzz and clear skin",
            "Robust shoot elongation and balanced canopy development"
        ],
        "risk_factors": [
            "Standard orchard environmental conditions"
        ],
        "recommendations": [
            "Apply dormant copper spray in late winter to suppress peach leaf curl and bacteria",
            "Properly thin fruit clusters to achieve optimal size and canopy balance",
            "Maintain consistent drip irrigation during fruit swelling and pit hardening",
            "Scout regularly for peach tree borers and oriental fruit moths"
        ],
        "marathi": {
            "display_name": "पीच — निरोगी (Healthy)",
            "plant": "पीच (सप्ताळू)",
            "disease": "निरोगी",
            "symptoms": [
                "पाने लांबट, टवटवीत व चमकदार हिरवी",
                "खोडावर कोणताही डिंक किंवा व्रण नाही",
                "फळांची वाढ योग्य व निरोगी",
                "नवीन कोंबांची वाढ उत्तम"
            ],
            "recommendations": [
                "हिवाळ्याच्या शेवटी प्रतिबंधक कॉपर फवारणी करावी",
                "फळांची योग्य विरळणी करावी",
                "फळ फुगवणीच्या काळात ठिबक सिंचनाने पाणी द्यावे",
                "खोडकिड्यांवर नियमित लक्ष ठेवावे"
            ]
        }
    },
    "Pepper,_bell___Bacterial_spot": {
        "display_name": "Bell Pepper — Bacterial Spot",
        "plant": "Bell Pepper",
        "disease": "Bacterial Spot",
        "is_healthy": False,
        "risk_level": "HIGH",
        "symptoms": [
            "Small water-soaked circular to angular lesions on foliage turning dark brown",
            "Lesions surrounded by yellow halos, causing extensive premature leaf drop",
            "Defoliation exposing developing peppers to severe sunscald damage",
            "Raised, blister-like rough brown scabby spots on green and ripe pepper pods"
        ],
        "risk_factors": [
            "Warm temperatures (24–30°C) combined with high humidity and rainstorms",
            "Overhead sprinkler irrigation splashing bacteria between adjacent plants",
            "Use of uncertified, non-treated seeds or infected nursery transplants"
        ],
        "recommendations": [
            "Use certified disease-free seeds treated with hot water or sodium hypochlorite",
            "Apply fixed copper mixed with mancozeb for synergistic bactericidal protection",
            "Strictly avoid working in fields when foliage is wet from dew or irrigation",
            "Rotate out of solanaceous crops (tomatoes, peppers, potatoes) for at least 2 years"
        ],
        "marathi": {
            "display_name": "शिमला मिरची — जिवाणू ठिपके (Bacterial Spot)",
            "plant": "शिमला मिरची",
            "disease": "जिवाणू ठिपके (Bacterial Spot)",
            "symptoms": [
                "पानांवर लहान, ओलसर तपकिरी ठिपके पडणे",
                "ठिपक्यांभोवती पिवळे कडे दिसणे व पाने गळणे",
                "पाने गळाल्याने मिरच्या उन्हाने भाजणे",
                "मिरचीवर उंचावलेले खरखरीत खवल्यासारखे डाग दिसणे"
            ],
            "recommendations": [
                "प्रमाणित व प्रक्रिया केलेल्या बियाण्यांचाच वापर करावा",
                "कॉपर हायड्रॉक्साईड व मॅन्कोझेब एकत्र करून फवारावे",
                "पाने ओली असताना पिकात आंतरमशागत किंवा कामे करू नयेत",
                "टोमॅटो, मिरची पिकांची २-३ वर्षे फेरपालट करावी"
            ]
        }
    },
    "Pepper,_bell___healthy": {
        "display_name": "Bell Pepper — Healthy",
        "plant": "Bell Pepper",
        "disease": "Healthy",
        "is_healthy": True,
        "risk_level": "NONE",
        "symptoms": [
            "Glossy, dark green, firm leaves with smooth undamaged edges",
            "Sturdy erect main stem with strong branch nodes and white flowers",
            "Uniform, blocky bell pepper fruit set free of spots or blossom rot",
            "No foliar chlorosis, curling, or fungal sporulation"
        ],
        "risk_factors": [
            "Standard vegetable field / polyhouse conditions"
        ],
        "recommendations": [
            "Maintain consistent soil moisture through drip irrigation to prevent blossom-end rot",
            "Apply balanced calcium-nitrate and potassium fertigation during active fruiting",
            "Stake or trellis plants to support heavy pepper load and prevent lodging",
            "Scout for thrips, mites, and aphids on leaf undersides bi-weekly"
        ],
        "marathi": {
            "display_name": "शिमला मिरची — निरोगी (Healthy)",
            "plant": "शिमला मिरची",
            "disease": "निरोगी",
            "symptoms": [
                "पाने गर्द हिरवी, चमकदार व तजेलदार",
                "झाडाची रचना मजबूत व भरपूर फुले लागलेली",
                "मिरच्यांचा आकार एकसारखा व चमकदार",
                "कोणत्याही प्रकारचा करपा किंवा कीड नाही"
            ],
            "recommendations": [
                "कॅल्शियमच्या कमतरतेमुळे होणारा कूज रोग टाळण्यासाठी पाणी नियमित द्यावे",
                "कॅल्शियम नायट्रेट व पोटॅशयुक्त खतांचे नियोजन करावे",
                "झाडांना योग्य आधार द्यावा",
                "फुलकिडे (Thrips) व लाल कोळी किडींवर लक्ष ठेवावे"
            ]
        }
    },
    "Potato___Early_blight": {
        "display_name": "Potato — Early Blight",
        "plant": "Potato",
        "disease": "Early Blight",
        "is_healthy": False,
        "risk_level": "HIGH",
        "symptoms": [
            "Dark brown to black circular lesions with distinct concentric 'target rings' on older leaves",
            "Chlorotic yellowing of leaf tissue surrounding the spots",
            "Stem lesions causing leaf yellowing and collar rot",
            "Dark, sunken, leathery dry lesions on potato tubers"
        ],
        "risk_factors": [
            "Alternating wet and dry weather cycles with warm temperatures (24–29°C)",
            "Crop stress caused by heavy tuber bulking, nitrogen deficiency, or drought",
            "Prolonged leaf wetness caused by overhead irrigation"
        ],
        "recommendations": [
            "Spray chlorothalonil, mancozeb, or azoxystrobin at first appearance of lesions",
            "Maintain balanced nitrogen and potassium nutrition during active tuber bulking",
            "Irrigate early in the morning so foliage dries rapidly in sunlight",
            "Allow tuber skins to mature before harvest and handle tubers gently to avoid bruising"
        ],
        "marathi": {
            "display_name": "बटाटा — लवकर येणारा करपा (Early Blight)",
            "plant": "बटाटा",
            "disease": "लवकर येणारा करपा (Early Blight)",
            "symptoms": [
                "जुन्या पानांवर गोलाकार चक्राकार (Target Rings) तपकिरी चट्टे पडणे",
                "चट्ट्यांभोवती पाने पिवळी पडणे",
                "खोडावर चट्टे पडून पाने सुकणे",
                "बटाट्यावर काळे खोलगट चामड्यासारखे डाग दिसणे"
            ],
            "recommendations": [
                "लक्षणे दिसताच मॅन्कोझेब किंवा क्लोरोथॅलोनिल बुरशीनाशक फवारावे",
                "बटाटे पोसण्याच्या काळात नत्र व पोटॅशचे योग्य प्रमाण ठेवावे",
                "सकाळी लवकर पाणी द्यावे जेणेकरून पाने लवकर सुकतील",
                "काढणीवेळी बटाट्याची साल पक्की असू द्यावी व इजा टाळावी"
            ]
        }
    },
    "Potato___Late_blight": {
        "display_name": "Potato — Late Blight",
        "plant": "Potato",
        "disease": "Late Blight",
        "is_healthy": False,
        "risk_level": "CRITICAL",
        "symptoms": [
            "Large, irregular water-soaked pale-to-brown lesions on leaf margins",
            "Delicate white cottony fungal growth on the underside of leaves in humid conditions",
            "Rapid collapse, blackening, and rotting of the entire vine canopy with pungent odor",
            "Brown-to-purplish granular dry rot extending inside potato tubers"
        ],
        "risk_factors": [
            "Cool to moderate temperatures (15–20°C) with continuous wetness (>90% humidity)",
            "Presence of infected cull piles, volunteer potato plants, or nearby infected fields",
            "Persistent overcast conditions, fog, heavy dew, or prolonged rain"
        ],
        "recommendations": [
            "Apply protectant and systemic fungicides (metalaxyl, cymoxanil, or mandipropamid) immediately upon forecast alert",
            "Eradicate and bury infected cull piles and volunteer potato sprouts completely",
            "Ensure proper hilling to build a thick soil barrier over growing tubers",
            "Desiccate or mow haulms 2 weeks before harvest to prevent tuber infection"
        ],
        "marathi": {
            "display_name": "बटाटा — उशिरा येणारा करपा (Late Blight)",
            "plant": "बटाटा",
            "disease": "उशिरा येणारा करपा (Late Blight)",
            "symptoms": [
                "पानांवर ओलसर, काळे-तपकिरी मोठे डाग पडणे",
                "दमट वातावरणात पानांच्या खाली पांढऱ्या बुरशीची वाढ दिसणे",
                "संपूर्ण पीक झपाट्याने काळे पडून जळणे व दुर्गंधी येणे",
                "बटाट्याच्या आत तपकिरी कोरडी कूज तयार होणे"
            ],
            "recommendations": [
                "धोकादायक हवामान दिसताच मेटॅलॅक्सिल किंवा सायमोक्सॅनिलयुक्त औषध त्वरित फवारावे",
                "रोगट बटाट्याचे ढीग व अवशेष नष्ट करावेत",
                "बटाट्यांवर मातीची चांगली भर लावावी जेणेकरून बुरशी कंदांपर्यंत पोहोचणार नाही",
                "काढणीपूर्वी १५ दिवस आधी झाडाचे शेंडे कापून टाकावेत"
            ]
        }
    },
    "Potato___healthy": {
        "display_name": "Potato — Healthy",
        "plant": "Potato",
        "disease": "Healthy",
        "is_healthy": True,
        "risk_level": "NONE",
        "symptoms": [
            "Lush, robust dark green composite leaves with clean leaf veins",
            "Vigorous upright canopy growth with healthy white/purple flowering",
            "No water-soaked spots, target rings, or wilting foliage",
            "Firm, healthy green stems with active tuber bulking underneath"
        ],
        "risk_factors": [
            "Standard commercial potato field conditions"
        ],
        "recommendations": [
            "Maintain scheduled hilling to keep developing tubers well protected from sunlight",
            "Use drip irrigation or schedule morning overhead runs to ensure prompt canopy drying",
            "Conduct soil testing to supply adequate phosphorus and potassium for tuber sizing",
            "Scout crop field borders and low-lying damp areas twice weekly"
        ],
        "marathi": {
            "display_name": "बटाटा — निरोगी (Healthy)",
            "plant": "बटाटा",
            "disease": "निरोगी",
            "symptoms": [
                "पाने गर्द हिरवीगार, निरोगी व टवटवीत",
                "झाडांची वाढ सरळ व मजबूत",
                "कोणत्याही प्रकारचा करपा किंवा चट्टे नाहीत",
                "खाली बटाट्यांची वाढ उत्तम सुरू आहे"
            ],
            "recommendations": [
                "बटाट्यांना उघडे पडू न देण्यासाठी वेळेवर मातीची भर द्यावी",
                "ठिबक सिंचनाचा वापर करावा किंवा सकाळी पाणी द्यावे",
                "स्फुरद व पालाशयुक्त खतांचा योग्य वापर करावा",
                "खालच्या दमट भागांवर आठवड्यातून दोनदा लक्ष ठेवावे"
            ]
        }
    },
    "Raspberry___healthy": {
        "display_name": "Raspberry — Healthy",
        "plant": "Raspberry",
        "disease": "Healthy",
        "is_healthy": True,
        "risk_level": "NONE",
        "symptoms": [
            "Vibrant green serrated composite leaves with clean silver undersides",
            "Erect, firm primocanes and floricanes free of spur blight lesions",
            "Prolific healthy flower clusters and plump berry development",
            "Uniform cane vigor across the berry hedgerow"
        ],
        "risk_factors": [
            "Standard berry patch conditions"
        ],
        "recommendations": [
            "Prune out fruited floricanes to the ground immediately after summer harvest",
            "Maintain well-drained raised beds and apply clean woodchip mulch",
            "Support canes on a sturdy trellis wire system to maximize sunlight exposure",
            "Monitor cane bases periodically for crown borers and cane blight"
        ],
        "marathi": {
            "display_name": "रास्पबेरी — निरोगी (Healthy)",
            "plant": "रास्पबेरी",
            "disease": "निरोगी",
            "symptoms": [
                "पाने तजेलदार हिरवी व कडा सुबक",
                "वेली व काड्या निरोगी, कोणत्याही रोगाचे डाग नाहीत",
                "फुलोरा व फळे उत्तम दर्जाची",
                "झुडपांची वाढ जोमदार"
            ],
            "recommendations": [
                "काढणीनंतर जुन्या काड्यांची जमिनीलगत छाटणी करावी",
                "पाण्याचा निचरा चांगला राहील अशा उंच गादीवाफ्यांवर लागवड ठेवावी",
                "काड्यांना तारांचा चांगला आधार द्यावा",
                "खोडकिड्यांवर नियमित लक्ष ठेवावे"
            ]
        }
    },
    "Soybean___healthy": {
        "display_name": "Soybean — Healthy",
        "plant": "Soybean",
        "disease": "Healthy",
        "is_healthy": True,
        "risk_level": "NONE",
        "symptoms": [
            "Clean trifoliate leaves with vibrant, uniform green coloration",
            "Active nitrogen-fixing root nodules with healthy pink internal color",
            "Sturdy branching stems with continuous flower and pod development",
            "No rust pustules, frogeye spots, or viral mosaic mottling"
        ],
        "risk_factors": [
            "Standard agricultural field conditions"
        ],
        "recommendations": [
            "Ensure proper Bradyrhizobium seed inoculation during planting for optimal nitrogen fixation",
            "Maintain effective weed control during the early critical period (V1 to V4)",
            "Scout fields regularly for soybean aphid, semilooper, and pod borer economic thresholds",
            "Ensure adequate field drainage to avoid root rot complexes in heavy soils"
        ],
        "marathi": {
            "display_name": "सोयाबीन — निरोगी (Healthy)",
            "plant": "सोयाबीन",
            "disease": "निरोगी",
            "symptoms": [
                "पाने गर्द हिरवी, तीन पानांचा सुबक आकार",
                "मुळांवर उपयुक्त गुलाबी गाठी (रायझोबियम) सक्रिय",
                "झाडाची वाढ मजबूत, शेंगांचा विकास उत्तम",
                "कोणत्याही प्रकारचा तांबेरा किंवा पिवळेपणा नाही"
            ],
            "recommendations": [
                "पेरणीवेळी रायझोबियम जीवाणू संवर्धकाची बीजप्रक्रिया करावी",
                "पहिल्या ३०-४० दिवसांत शेत तणमुक्त ठेवावे",
                "उंट अळी व शेंगा पोखरणार्या अळीवर नियमित लक्ष ठेवावे",
                "जास्त पाणी साचणार नाही याची काळजी घ्यावी"
            ]
        }
    },
    "Squash___Powdery_mildew": {
        "display_name": "Squash — Powdery Mildew",
        "plant": "Squash",
        "disease": "Powdery Mildew",
        "is_healthy": False,
        "risk_level": "HIGH",
        "symptoms": [
            "Powdery white, talcum-like fungal spots expanding over upper and lower leaf surfaces",
            "Infected leaves turn chlorotic yellow, then brown and dry to a brittle texture",
            "Premature defoliation exposing squash fruit to severe sunscald",
            "Reduced fruit sweetness, poor flavor, and reduced marketable yield"
        ],
        "risk_factors": [
            "Dense vine canopy with shaded lower foliage",
            "High relative humidity coupled with dry leaf surfaces",
            "Warm temperatures (20–30°C) typical of mid-to-late summer"
        ],
        "recommendations": [
            "Apply potassium bicarbonate, neem oil, sulfur, or triflumizole at earliest signs of mildew",
            "Select powdery mildew-resistant squash hybrids (PMR varieties)",
            "Provide ample row spacing (5–6 feet) to enhance air movement through the vine canopy",
            "Remove and compost severely infected individual leaves before total vine decline"
        ],
        "marathi": {
            "display_name": "भोपळा — भुरी रोग (Powdery Mildew)",
            "plant": "भोपळा (Squash)",
            "disease": "भुरी रोग (Powdery Mildew)",
            "symptoms": [
                "पानांवर पांढऱ्या भुकटीसारखे डाग पसरणे",
                "पाने पिवळी पडून नंतर वाळणे व पापडासारखी होणे",
                "पाने गळून फळांवर ऊन लागणे",
                "फळांची गोडी व प्रत खालावणे"
            ],
            "recommendations": [
                "पोटॅशियम बायकार्बोनेट, गंधक किंवा निंबोळी अर्काची फवारणी करावी",
                "भुरी प्रतिकारक वाणांची लागवड करावी",
                "वेलींमध्ये पुरेशी जागा ठेवून हवा खेळती ठेवावी",
                "अतिप्रादुर्भाव झालेली पाने काढून नष्ट करावीत"
            ]
        }
    },
    "Strawberry___Leaf_scorch": {
        "display_name": "Strawberry — Leaf Scorch",
        "plant": "Strawberry",
        "disease": "Leaf Scorch",
        "is_healthy": False,
        "risk_level": "MODERATE",
        "symptoms": [
            "Numerous small, irregular purplish-dark spots scattered on upper leaf surfaces",
            "Spots enlarge and merge; leaves appear burned or scorched around the margins",
            "Leaf margins curling upward and drying completely to a crisp brown",
            "Reduced plant vigor, weak crown development, and diminished runner production"
        ],
        "risk_factors": [
            "Prolonged leaf wetness from frequent rain, dew, or overhead sprinkler irrigation",
            "Warm, humid weather (20–26°C)",
            "Overly dense strawberry matted beds with poor airflow"
        ],
        "recommendations": [
            "Apply preventive copper or captan fungicides in early spring as new growth commences",
            "Renovate strawberry beds after harvest: mow foliage above crowns and rake out debris",
            "Switch from overhead sprinklers to drip irrigation to keep crowns dry",
            "Thin runner daughter plants properly to maintain good airflow between crowns"
        ],
        "marathi": {
            "display_name": "स्ट्रॉबेरी — पानांवरील करपा (Leaf Scorch)",
            "plant": "स्ट्रॉबेरी",
            "disease": "पानांवरील करपा (Leaf Scorch)",
            "symptoms": [
                "पानांच्या वर जांभळट रंगाचे असंख्य लहान ठिपके दिसणे",
                "ठिपके मोठे होऊन पाने करपल्यासारखी दिसणे",
                "पानांच्या कडा वरच्या बाजूला वाकून वाळणे",
                "झाडाची वाढ खुंटणे व फुटवे कमी येणे"
            ],
            "recommendations": [
                "वसंत ऋतूच्या सुरुवातीला कॉपरयुक्त बुरशीनाशकाची फवारणी करावी",
                "काढणीनंतर झाडांची जुनी पाने छाटून बेड स्वच्छ करावा",
                "स्प्रिंकलरऐवजी ठिबक सिंचनाचा वापर करावा",
                "रोपांमध्ये योग्य अंतर राखून हवा खेळती ठेवावी"
            ]
        }
    },
    "Strawberry___healthy": {
        "display_name": "Strawberry — Healthy",
        "plant": "Strawberry",
        "disease": "Healthy",
        "is_healthy": True,
        "risk_level": "NONE",
        "symptoms": [
            "Deep green trifoliate leaves with vibrant serrated margins and firm texture",
            "Strong, thick crown with healthy white fibrous root structure",
            "No purple spotting, scorched margins, or botrytis gray mold",
            "Clean white blossoms and developing glossy red berries"
        ],
        "risk_factors": [
            "Standard commercial strawberry field conditions"
        ],
        "recommendations": [
            "Maintain clean straw or plastic mulch under fruit clusters to prevent soil contact",
            "Apply balanced fertilizer following post-harvest summer bed renovation",
            "Provide consistent moisture via drip irrigation without over-saturating root zones",
            "Scout weekly for two-spotted spider mites and cyclamen mites"
        ],
        "marathi": {
            "display_name": "स्ट्रॉबेरी — निरोगी (Healthy)",
            "plant": "स्ट्रॉबेरी",
            "disease": "निरोगी",
            "symptoms": [
                "पाने गर्द हिरवी, टवटवीत व निरोगी",
                "झाडाचे खोड (Crown) मजबूत व मुळे पांढरीशुभ्र",
                "कोणत्याही प्रकारचे डाग किंवा करपा नाही",
                "फुले व फळे चमकदार व निरोगी"
            ],
            "recommendations": [
                "फळांचा मातीशी संपर्क येऊ नये म्हणून मल्चिंगचा वापर करावा",
                "काढणीनंतर संतुलित खते द्यावीत",
                "ठिबक सिंचनाने मुळांशी योग्य ओलावा ठेवावा",
                "लाल कोळी किडीवर नियमित देखरेख ठेवावी"
            ]
        }
    },
    "Tomato___Bacterial_spot": {
        "display_name": "Tomato — Bacterial Spot",
        "plant": "Tomato",
        "disease": "Bacterial Spot",
        "is_healthy": False,
        "risk_level": "HIGH",
        "symptoms": [
            "Small, water-soaked circular to angular dark brown lesions on foliage",
            "Lesions surrounded by prominent chlorotic yellow halos; extensive leaf drop",
            "Sunscald on exposed developing tomatoes caused by heavy defoliation",
            "Small, raised, black scab-like specks on green tomato fruits"
        ],
        "risk_factors": [
            "Warm temperatures (24–30°C) with high humidity and driving rain",
            "Overhead irrigation splashing bacterial cells across rows",
            "Contaminated seed stock or infected transplant seedlings"
        ],
        "recommendations": [
            "Apply copper bactericide combined with mancozeb for improved bacterial control",
            "Never cultivate, prune, or harvest tomato plants while leaves are wet",
            "Use drip irrigation exclusively and maintain excellent field sanitation",
            "Implement a strict 2-3 year crop rotation away from solanaceous crops"
        ],
        "marathi": {
            "display_name": "टोमॅटो — जिवाणू ठिपके (Bacterial Spot)",
            "plant": "टोमॅटो",
            "disease": "जिवाणू ठिपके (Bacterial Spot)",
            "symptoms": [
                "पानांवर लहान, ओलसर तपकिरी ठिपके पडणे",
                "ठिपक्यांभोवती पिवळे कडे दिसणे व पाने मोठ्या प्रमाणावर गळणे",
                "पाने गळाल्यामुळे टोमॅटो उन्हाने भाजणे (Sunscald)",
                "हिरव्या टोमॅटोवर लहान, उंचवटा असलेले काळे ठिपके दिसणे"
            ],
            "recommendations": [
                "कॉपरयुक्त जिवाणूनाशक आणि मॅन्कोझेब एकत्र फवारावे",
                "पाने ओली असताना पिकात कोणतेही काम करू नये",
                "ठिबक सिंचनाचा वापर करावा व पाणी पानांवर पडू देऊ नये",
                "टोमॅटो आणि मिरची पिकांची २-३ वर्षे फेरपालट करावी"
            ]
        }
    },
    "Tomato___Early_blight": {
        "display_name": "Tomato — Early Blight",
        "plant": "Tomato",
        "disease": "Early Blight",
        "is_healthy": False,
        "risk_level": "HIGH",
        "symptoms": [
            "Dark brown concentric circular spots ('bullseye' or 'target' pattern) on older leaves",
            "Yellowing tissue surrounding lesions that spreads across entire leaflets",
            "Stem lesions creating collar rot on young seedlings and stem girdling",
            "Dark, leathery sunken lesions near the fruit stem attachment point"
        ],
        "risk_factors": [
            "Warm temperatures (24–29°C) and alternating wet and dry periods",
            "Dense foliage with inadequate airflow around bottom leaves",
            "Plant stress caused by heavy fruit load or low nitrogen fertility"
        ],
        "recommendations": [
            "Prune bottom 12 inches of foliage to eliminate soil-splash spore entry",
            "Apply chlorothalonil, mancozeb, or copper fungicides at initial sign of spotting",
            "Apply thick organic straw or plastic mulch to create a physical barrier over soil spores",
            "Water strictly at root level using drip irrigation, never overhead sprinklers"
        ],
        "marathi": {
            "display_name": "टोमॅटो — लवकर येणारा करपा (Early Blight)",
            "plant": "टोमॅटो",
            "disease": "लवकर येणारा करपा (Early Blight)",
            "symptoms": [
                "जुन्या पानांवर गोलाकार चक्राकार (Bullseye/लक्ष्यवेध) चट्टे दिसणे",
                "चट्ट्यांच्या भोवती पान पिवळे पडून वाळणे",
                "खोडावर चट्टे पडून रोपे कमकुवत होणे",
                "फळांच्या देठाजवळ काळे चामड्यासारखे खोलगट डाग पडणे"
            ],
            "recommendations": [
                "मातीतून उडणारे बीजाणू रोखण्यासाठी खालची १ फूट पाने छाटून काढावीत",
                "सुरुवातीलाच क्लोरोथॅलोनिल किंवा कॉपरयुक्त बुरशीनाशक फवारावे",
                "झाडाच्या मुळांशी पालापाचोळा किंवा प्लास्टिकचे मल्चिंग करावे",
                "ठिबक सिंचनाने फक्त मुळांशी पाणी द्यावे"
            ]
        }
    },
    "Tomato___Late_blight": {
        "display_name": "Tomato — Late Blight",
        "plant": "Tomato",
        "disease": "Late Blight",
        "is_healthy": False,
        "risk_level": "CRITICAL",
        "symptoms": [
            "Large, irregular water-soaked pale-to-dark brown lesions rapidly spreading across leaves",
            "Fuzzy white fungal growth on the underside of leaves during humid weather",
            "Dark brown to purplish cankers girdling stems, causing total vine collapse",
            "Firm, dark, greasy, bumpy rot on green and ripening tomato fruits"
        ],
        "risk_factors": [
            "Cool, wet, overcast weather (15–22°C) with continuous humidity >90%",
            "Nearby infected potato or tomato fields producing airborne sporangia",
            "Prolonged morning dew lasting longer than 8 hours"
        ],
        "recommendations": [
            "Apply systemic fungicides (cymoxanil, mandipropamid, or metalaxyl) immediately upon weather alert",
            "Uproot and immediately bag severely infected plants; do not compost them",
            "Ensure ample row spacing and stake plants securely to improve drying airflow",
            "Monitor local late blight disease forecasts during rainy cool periods"
        ],
        "marathi": {
            "display_name": "टोमॅटो — उशिरा येणारा करपा (Late Blight)",
            "plant": "टोमॅटो",
            "disease": "उशिरा येणारा करपा (Late Blight)",
            "symptoms": [
                "पानांवर मोठे, काळपट-तपकिरी पाणीदार चट्टे वेगाने पसरणे",
                "दमट हवेत पानांच्या खाली पांढरी कापसासारखी बुरशी दिसणे",
                "खोडावर काळे व्रण पडून झाड अचानक उन्मळून पडणे",
                "फळांवर कडक, तेलकट काळपट डाग पडून फळे कुजणे"
            ],
            "recommendations": [
                "धोकादायक ढगाळ हवामानात त्वरित सायमोक्सॅनिल किंवा मेटॅलॅक्सिल फवारावे",
                "अतिप्रादुर्भाव झालेली रोपे पिशवीत भरून शेताबाहेर नष्ट करावीत",
                "झाडांना व्यवस्थित बांधून तारांवर आधार द्यावा जेणेकरून हवा खेळती राहील",
                "स्थानिक हवामान व करपा अंदाजावर लक्ष ठेवावे"
            ]
        }
    },
    "Tomato___Leaf_Mold": {
        "display_name": "Tomato — Leaf Mold",
        "plant": "Tomato",
        "disease": "Leaf Mold",
        "is_healthy": False,
        "risk_level": "MODERATE",
        "symptoms": [
            "Pale green to yellowish chlorotic spots with indistinct margins on upper leaf surfaces",
            "Olive-green to velvety brown mold growth on corresponding lower leaf surfaces",
            "Leaves curl upward, wither, and drop prematurely starting from bottom of vine",
            "Flower blossoms drop prematurely, leading to reduced total fruit set"
        ],
        "risk_factors": [
            "High relative humidity (>85%) with warm temperatures (21–24°C)",
            "Greenhouse, polyhouse, or high-tunnel environments with restricted ventilation",
            "Dense, unpruned indeterminate foliage trapping moisture"
        ],
        "recommendations": [
            "Dramatically improve polyhouse / field ventilation with exhaust fans and open vents",
            "Prune side shoots (suckers) and lower leaves to maximize air movement",
            "Apply copper fungicide, chlorothalonil, or mancozeb at first sign of mold",
            "Keep foliage completely dry during watering operations"
        ],
        "marathi": {
            "display_name": "टोमॅटो — पानांवरील बुरशी (Leaf Mold)",
            "plant": "टोमॅटो",
            "disease": "पानांवरील बुरशी (Leaf Mold)",
            "symptoms": [
                "पानांच्या वरच्या बाजूला फिकट पिवळे डाग दिसणे",
                "पानांच्या खालील बाजूला ऑलिव्ह-हिरवट ते मखमली तपकिरी बुरशी दिसणे",
                "पाने आकसणे व खालून वर गळत जाणे",
                "फुलगळ होऊन उत्पादनात मोठी घट होणे"
            ],
            "recommendations": [
                "पॉलीहाऊस किंवा शेतात हवा खेळती राहण्यासाठी व्हेंटिलेशन वाढवावे",
                "झाडांचे अनावश्यक फुटवे (Suckers) व खालची पाने छाटावीत",
                "कॉपर किंवा क्लोरोथॅलोनिलयुक्त बुरशीनाशकाची फवारणी करावी",
                "पाणी देताना पाने ओली होणार नाहीत याची दक्षता घ्यावी"
            ]
        }
    },
    "Tomato___Septoria_leaf_spot": {
        "display_name": "Tomato — Septoria Leaf Spot",
        "plant": "Tomato",
        "disease": "Septoria Leaf Spot",
        "is_healthy": False,
        "risk_level": "HIGH",
        "symptoms": [
            "Numerous small, circular spots (1.5–3 mm) with grayish-tan centers and dark margins",
            "Tiny black specks (pycnidia) clearly visible inside the center of mature spots",
            "Progressive bottom-to-top leaf yellowing and complete defoliation",
            "Sunscald damage on tomato fruits due to extensive leaf canopy loss"
        ],
        "risk_factors": [
            "Extended wet periods with temperatures between 20°C and 25°C",
            "Rain splash carrying fungal spores from overwintered soil debris onto lower leaves",
            "Dense weed cover harboring wild solanaceous host plants"
        ],
        "recommendations": [
            "Strip off lower leaves up to the first flower cluster once plants are established",
            "Apply organic straw or plastic mulch around the plant base to stop soil splash",
            "Spray copper fungicide, chlorothalonil, or potassium bicarbonate on a 7-10 day schedule",
            "Rotate out of tomatoes and related nightshades for a minimum of 2 years"
        ],
        "marathi": {
            "display_name": "टोमॅटो — सेप्टोरिया करपा (Septoria Leaf Spot)",
            "plant": "टोमॅटो",
            "disease": "सेप्टोरिया करपा (Septoria Leaf Spot)",
            "symptoms": [
                "पानांवर असंख्य लहान गोलाकार (१.५-३ मिमी) करडे चट्टे पडणे",
                "चट्ट्यांच्या मध्यभागी काळे बारीक ठिपके स्पष्ट दिसणे",
                "खालची पाने पिवळी पडून वरपर्यंत गळत जाणे",
                "पाने गळाल्याने टोमॅटो उन्हाने भाजणे"
            ],
            "recommendations": [
                "पहिले फूल लागेपर्यंत खालची पाने खुडून टाकावीत",
                "मातीतील बुरशी पानांवर उडू नये म्हणून आच्छादन (मल्चिंग) करावे",
                "कॉपर बुरशीनाशकाची ७-१० दिवसांच्या अंतराने फवारणी करावी",
                "किमान २ वर्षे टोमॅटोची फेरपालट ठेवावी"
            ]
        }
    },
    "Tomato___Spider_mites Two-spotted_spider_mite": {
        "display_name": "Tomato — Two-Spotted Spider Mite",
        "plant": "Tomato",
        "disease": "Spider Mites",
        "is_healthy": False,
        "risk_level": "HIGH",
        "symptoms": [
            "Fine yellow or white stippling and flecking across upper leaf surfaces",
            "Delicate silky webbing on the undersides of leaves and growing tips",
            "Leaves turn bronzed, dry out, and turn brittle under severe feeding",
            "Flower abortion and unmarketable scarred or russeted tomato fruits"
        ],
        "risk_factors": [
            "Hot, dry, and dusty weather conditions (>30°C)",
            "Overuse of broad-spectrum synthetic insecticides eliminating natural predatory mites",
            "Water-stressed plants suffering from drought"
        ],
        "recommendations": [
            "Apply neem oil, insecticidal soap, or sulfur sprays targeting leaf undersides",
            "Release beneficial predatory mites (e.g., Phytoseiulus persimilis) in enclosed environments",
            "Spray foliage with a strong stream of water to knock down mites and dismantle webbing",
            "Maintain consistent drip irrigation to minimize plant drought stress"
        ],
        "marathi": {
            "display_name": "टोमॅटो — दोन ठिपक्यांचा लाल कोळी (Spider Mites)",
            "plant": "टोमॅटो",
            "disease": "लाल कोळी (Spider Mites)",
            "symptoms": [
                "पानांच्या वर पांढुरके किंवा पिवळसर बारीक ठिपके दिसणे",
                "पानांच्या खाली व शेंड्यांवर बारीक रेशमी जाळे तयार होणे",
                "पाने तांबूस पडून वाळणे व कुरकुरीत होणे",
                "फुले गळणे आणि फळांवर डाग पडणे"
            ],
            "recommendations": [
                "पानांच्या खालच्या बाजूला निंबोळी अर्क किंवा सल्फरची फवारणी करावी",
                "मित्र कीटक (Predatory Mites) चा वापर करावा",
                "पाण्याचा जोरदार फवारा मारून जाळे व कोळी धुवून काढावेत",
                "पिकाला पाण्याचा ताण पडू देऊ नये"
            ]
        }
    },
    "Tomato___Target_Spot": {
        "display_name": "Tomato — Target Spot",
        "plant": "Tomato",
        "disease": "Target Spot",
        "is_healthy": False,
        "risk_level": "HIGH",
        "symptoms": [
            "Small brown circular lesions with light brown centers and dark concentric rings",
            "Spots enlarge up to 1 cm with pronounced chlorotic yellow halos",
            "Petioles and stems develop dark elongated lesions causing defoliation",
            "Sunken circular brown lesions on tomato fruits with velvety centers"
        ],
        "risk_factors": [
            "Warm temperatures (20–30°C) combined with high relative humidity and rainfall",
            "Overcrowded plant canopy restricting sunlight penetration",
            "Poor disposal of crop debris from preceding tomato cycles"
        ],
        "recommendations": [
            "Apply strobilurin or carboxamide fungicides (e.g., azoxystrobin, boscalid)",
            "Stake and prune plants to improve airflow and allow complete fungicide spray coverage",
            "Remove and deeply bury crop debris immediately following the final harvest",
            "Avoid overhead irrigation methods to keep foliage dry"
        ],
        "marathi": {
            "display_name": "टोमॅटो — लक्ष्यवेध करपा (Target Spot)",
            "plant": "टोमॅटो",
            "disease": "लक्ष्यवेध करपा (Target Spot)",
            "symptoms": [
                "पानांवर गोलाकार तपकिरी चट्टे व मध्यभागी चक्राकार कडे दिसणे",
                "चट्ट्यांभोवती पिवळे कडे दिसणे व पाने गळणे",
                "देठ व खोडावर लांबट काळे व्रण पडणे",
                "फळांवर खोलगट तपकिरी मखमली चट्टे दिसणे"
            ],
            "recommendations": [
                "ॲझॉक्सीस्ट्रॉबिन किंवा योग्य बुरशीनाशकाची फवारणी करावी",
                "झाडांची छाटणी करून हवा व औषध सर्वत्र पोहोचेल अशी व्यवस्था करावी",
                "काढणीनंतर पिकाचे अवशेष जमिनीत खोल गाडावेत",
                "ठिबक सिंचनाचा वापर करावा"
            ]
        }
    },
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
        "display_name": "Tomato — Tomato Yellow Leaf Curl Virus (TYLCV)",
        "plant": "Tomato",
        "disease": "Yellow Leaf Curl Virus",
        "is_healthy": False,
        "risk_level": "CRITICAL",
        "symptoms": [
            "Severe upward curling and cupping of leaf margins with reduced leaf size",
            "Interveinal chlorosis and intense yellowing of young developing leaves",
            "Marked stunting of plants leading to a compact, bushy, erect growth habit",
            "Severe floral abortion resulting in little to no fruit development"
        ],
        "risk_factors": [
            "Infestation by Silverleaf Whitefly (Bemisia tabaci) insect vector",
            "Warm, dry seasons favoring massive whitefly population explosions",
            "Proximity to older infected tomato, cotton, or weed hosts"
        ],
        "recommendations": [
            "Deploy yellow sticky cards across the field to monitor and trap whiteflies early",
            "Apply systemic insecticides (imidacloprid, acetamiprid) or neem oil to control whitefly populations",
            "Install fine 50-mesh insect-proof netting over seedling nurseries and greenhouses",
            "Uproot, bag, and destroy infected virus-stunted plants immediately"
        ],
        "marathi": {
            "display_name": "टोमॅटो — पिवळा पानांचा चुरडा-मुरडा (TYLCV)",
            "plant": "टोमॅटो",
            "disease": "पिवळा चुरडा-मुरडा व्हायरस",
            "symptoms": [
                "पाने वरच्या बाजूला वाटीसारखी वळणे व पानांचा आकार लहान होणे",
                "कोवळी पाने पिवळी पडणे व शिरांमधील भाग पिवळा होणे",
                "झाडाची वाढ खुंटून झाड झुडपासारखे खुजे दिसणे",
                "फुलगळ होऊन फळे अजिबात न लागणे"
            ],
            "recommendations": [
                "पांढऱ्या माशीच्या नियंत्रणासाठी पिवळे चिकट सापळे लावावेत",
                "इमिडाक्लोप्रिड किंवा निंबोळी अर्काची फवारणी करून पांढरी माशी रोखावी",
                "रोपवाटिकेवर ५० मेशची कीटक प्रतिबंधक जाळी वापरावी",
                "व्हायरसग्रस्त झाडे त्वरित मुळासकट उपटून नष्ट करावीत"
            ]
        }
    },
    "Tomato___Tomato_mosaic_virus": {
        "display_name": "Tomato — Tomato Mosaic Virus (ToMV)",
        "plant": "Tomato",
        "disease": "Tomato Mosaic Virus",
        "is_healthy": False,
        "risk_level": "CRITICAL",
        "symptoms": [
            "Mottling with alternating dark and light green patches on leaves",
            "Severe leaf distortion including 'shoestring' or fern-like thinning of foliage",
            "Stunting of the entire plant with uneven fruit ripening and blotchy coloration",
            "Internal brown necrosis within the fruit walls"
        ],
        "risk_factors": [
            "Mechanical transmission via workers' hands, tools, or contaminated clothing",
            "Tobacco use by field workers (virus is transmissible from cigarette residue)",
            "Infected seed lots or reused contaminated seedling trays"
        ],
        "recommendations": [
            "Wash hands thoroughly with soap or milk solution before handling tomato plants",
            "Disinfect pruning knives and tools with 10% trisodium phosphate (TSP) or bleach solution",
            "Plant certified mosaic-resistant tomato cultivars (labeled 'ToMV resistant')",
            "Carefully rogue and destroy infected plants without touching neighboring healthy plants"
        ],
        "marathi": {
            "display_name": "टोमॅटो — मोझॅक व्हायरस (ToMV)",
            "plant": "टोमॅटो",
            "disease": "मोझॅक व्हायरस (Mosaic Virus)",
            "symptoms": [
                "पानांवर फिकट व गर्द हिरव्या रंगाचे पट्टे किंवा ठिपके दिसणे",
                "पानांचा आकार वेडावाकडा किंवा दोरीसारखा बारीक होणे (Shoestring)",
                "झाडाची वाढ खुंटणे व फळे विषम पिकणे",
                "टोमॅटोच्या आत तपकिरी चट्टे पडणे"
            ],
            "recommendations": [
                "रोपांना हात लावण्यापूर्वी हात साबणाने स्वच्छ धुवावेत",
                "छाटणीची अवजारे जंतुनाशकाने निर्जंतुक करावीत",
                "मोझॅक प्रतिकारक प्रमाणित वाणांचीच निवड करावी",
                "रोगट झाडांना इतर झाडांचा स्पर्श न करता उपटून नष्ट करावे"
            ]
        }
    },
    "Tomato___healthy": {
        "display_name": "Tomato — Healthy",
        "plant": "Tomato",
        "disease": "Healthy",
        "is_healthy": True,
        "risk_level": "NONE",
        "symptoms": [
            "Lush, deep green leaves with crisp margins and clean undamaged veins",
            "Sturdy glandular-hairy stems with strong apical and lateral shoot growth",
            "Abundant yellow blossom clusters with healthy fruit setting",
            "No chlorosis, necrosis, leaf curling, or webbing visible"
        ],
        "risk_factors": [
            "Standard farm / garden conditions"
        ],
        "recommendations": [
            "Maintain consistent drip fertigation with adequate calcium to prevent blossom-end rot",
            "Prune lower suckers and securely stake or trellis vines to improve airflow",
            "Scout crop bi-weekly for hornworms, whiteflies, and early blight spotting",
            "Maintain clean straw or plastic mulch to protect soil moisture and discourage weeds"
        ],
        "marathi": {
            "display_name": "टोमॅटो — निरोगी (Healthy)",
            "plant": "टोमॅटो",
            "disease": "निरोगी",
            "symptoms": [
                "पाने गर्द हिरवी, टवटवीत व निरोगी",
                "खोडाची वाढ मजबूत व भरपूर फुले लागलेली",
                "टोमॅटोचा विकास एकसारखा व चमकदार",
                "कोणत्याही प्रकारचा रोग, चट्टे किंवा कीड नाही"
            ],
            "recommendations": [
                "कॅल्शियमयुक्त खतांचा वापर करून फळ सडणे टाळावे",
                "झाडांना व्यवस्थित आधार देऊन कॅनोपी मोकळी ठेवावी",
                "कीड व रोगांवर नियमित देखरेख ठेवावी",
                "मुळांपाशी पाण्याचा निचरा योग्य राखावा"
            ]
        }
    }
}


def get_disease_info(class_name: str) -> dict:
    """Retrieve disease knowledge dictionary for a given raw class name."""
    if class_name in DISEASE_INFO:
        return DISEASE_INFO[class_name]

    parts = class_name.split("___")
    plant = parts[0].replace("_", " ")
    disease = parts[1].replace("_", " ") if len(parts) > 1 else "Unknown"
    is_healthy = "healthy" in disease.lower()

    return {
        "display_name": f"{plant} — {disease}",
        "plant": plant,
        "disease": disease,
        "is_healthy": is_healthy,
        "risk_level": "NONE" if is_healthy else "MODERATE",
        "symptoms": ["Normal foliage" if is_healthy else "Leaf spotting or discoloration detected"],
        "risk_factors": ["Standard field conditions"],
        "recommendations": ["Maintain regular balanced irrigation and nutrient application"],
        "marathi": {
            "display_name": f"{plant} — {disease}",
            "plant": plant,
            "disease": disease,
            "symptoms": ["निरोगी पाने" if is_healthy else "पानांवर डाग दिसून आले आहेत"],
            "recommendations": ["नियमित पीक निगा राखावी"]
        }
    }
