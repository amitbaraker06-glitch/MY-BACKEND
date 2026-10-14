/** Pest and Disease Management Service - IPM based */
const pestDatabase = {
  rice: {
    pests: ['Stem borer', 'Leaf folder'],
    diseases: ['Blast', 'Brown spot'],
    symptoms: {
      stemBorer: 'Early yellowing, shot holes, dead hearts',
      leafFolder: 'Leaves rolled with silken threads'
    },
    prevention: ['Resistant varieties', 'Proper drainage', 'Remove crop residue'],
    biologicalControl: ['Trichoderma 2.5 kg/ha', 'Neem oil 3% spray'],
    culturalPractices: ['Field sanitation', 'Crop rotation', 'Proper spacing'],
    chemicalControl: 'Follow local pesticide recommendations'
  },
  wheat: {
    pests: ['Aphids', 'Termites'],
    diseases: ['Rust', 'Powdery mildew', 'Septoria'],
    symptoms: {
      aphids: 'Small insects, honeydew, curled leaves',
      termites: 'Root rot, yellow patches, mud tubes'
    },
    prevention: ['Resistant varieties', 'Crop rotation', 'Deep ploughing'],
    biologicalControl: ['Neem-based products', 'Beneficial insects'],
    culturalPractices: ['Remove weed hosts', 'Optimal nitrogen'],
    chemicalControl: 'Follow local recommendations - evening spray'
  },
  cotton: {
    pests: ['Bollworm', 'Whitefly'],
    diseases: ['Fusarium wilt', 'Root rot', 'Anthracnose'],
    symptoms: {
      bollworm: 'Bored bolls, shed flowers, webbed terminals',
      whitefly: 'Small white insects, sticky honeydew'
    },
    prevention: ['Resistant varieties', 'Pheromone traps', 'Destroy cotton debris'],
    biologicalControl: ['Trichogramma release', 'Neem oil'],
    culturalPractices: ['Deep summer ploughing', 'Crop rotation'],
    chemicalControl: 'Follow local recommendations - larval stage'
  },
  tomato: {
    pests: ['Whitefly', 'Jassids', 'Fruit borer'],
    diseases: ['Blight', 'Fusarium wilt', 'Yellow leaf curl'],
    symptoms: {
      whitefly: 'Small white insects, sticky residue, yellowing',
      jassids: 'Yellowing at leaf tips, V-shape pattern',
      blight: 'Dark lesions, rapid wilting'
    },
    prevention: ['Sticky traps', 'Companion planting', 'Remove infected plants'],
    biologicalControl: ['Trichogramma', 'Neem oil', 'Predatory mites'],
    culturalPractices: ['Staking', 'Crop rotation', 'Proper spacing'],
    chemicalControl: 'Avoid spraying during flowering'
  },
  potato: {
    pests: ['Colorado potato beetle', 'Aphids'],
    diseases: ['Late blight', 'Early blight', 'Viral diseases'],
    symptoms: {
      coloradoBeetle: 'Orange beetles, skeletonized leaves',
      lateBlight: 'Water-soaked lesions, rapid death'
    },
    prevention: ['Crop rotation', 'Remove volunteers', 'Certified seeds'],
    biologicalControl: ['Neem spray', 'Beneficial insects']
  },
  maize: {
    pests: ['Stem borer', 'Fall armyworm'],
    diseases: ['Gray leaf spot', 'Common rust', 'MDM'],
    symptoms: {
      stemBorer: 'Shot holes, dead hearts, larval tunnels',
      fallArmyworm: 'Windowpane feeding, frass on foliage'
    },
    prevention: ['Resistant varieties', 'Early planting', 'Destroy residue'],
    biologicalControl: ['Trichogramma', 'Neem oil']
  }
}

function getPestInfo(cropName) {
  const data = pestDatabase[cropName.toLowerCase()]
  if (!data) return null
  return { pests: data.pests, diseases: data.diseases, symptoms: data.symptoms }
}

function getPestRecommendations(cropName, symptoms, growthStage) {
  const data = pestDatabase[cropName.toLowerCase()]
  if (!data) {
    return { success: true, crop: cropName, possibleProblems: ['Unknown crop'], recommendations: { inspection: [], prevention: [], biologicalControl: [], chemicalControl: [] }, warnings: ['Consult local agricultural extension'] }
  }

  const found = []
  const rec = {
    inspection: [],
    prevention: [],
    biologicalControl: [],
    culturalControl: [],
    chemicalControl: []
  }

  const sLower = (symptoms || '').toLowerCase()
  for (const [prob, probSym] of Object.entries(data.symptoms || {})) {
    if (probSym && sLower.includes(prob.toLowerCase())) {
      found.push(prob)
      rec.inspection.push('Inspect for ' + prob)
      rec.biologicalControl.push('Apply ' + (data.biologicalControl || ['neem'])[0])
    }
  }

  if (found.length === 0) {
    rec.inspection.push('Inspect plants for common pests and diseases')
    rec.prevention.push('Maintain field sanitation')
    rec.biologicalControl.push('Apply neem-based products')
  } else {
    if (found.includes('blight') || found.includes('bollworm') || found.includes('late blight'))
      rec.culturalControl.push('Remove and destroy infected parts')
    if (found.includes('aphids') || found.includes('whitefly'))
      rec.culturalControl.push('Use yellow sticky traps')
  }

  rec.culturalControl.push(...(data.culturalPractices || []))

  const warnings = []
  if (growthStage && (growthStage === 'Flowering' || growthStage === 'Fruiting'))
    warnings.push('Caution: Avoid chemical pesticides during flowering/fruiting - harm pollinators')
  warnings.push('For chemical treatment, follow locally registered product labels and official agricultural recommendations')

  return {
    success: true,
    crop: data.crop || cropName,
    possibleProblems: found.length > 0 ? found : ['No specific problems matched - conduct thorough inspection'],
    recommendations: rec,
    warnings: warnings
  }
}

module.exports = { getPestInfo, getPestRecommendations }