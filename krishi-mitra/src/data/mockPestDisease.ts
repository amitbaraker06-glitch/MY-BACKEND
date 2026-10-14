import type { PestDiseaseAlert } from './types'

export const mockPestDiseaseAlert: PestDiseaseAlert = {
  name: 'Brown Planthopper',
  riskLevel: 'medium',
  symptoms: [
    'Yellowing and drying of leaves (hopper burn)',
    'Presence of honeydew on leaves',
    'Sooty mold growth on honeydew',
    'Stunted plant growth',
    'White waxy nymphs on leaf sheaths',
  ],
  prevention: [
    'Avoid excessive nitrogen fertilization',
    'Maintain proper plant spacing',
    'Use resistant varieties (e.g., IR64, Swarna)',
    'Synchronous planting in the area',
    'Conserve natural predators (spiders, dragonflies)',
  ],
  culturalPractices: [
    'Alternate wetting and drying irrigation',
    'Remove weed hosts from bunds',
    'Alleyways of 30 cm every 2 m for predator movement',
    'Avoid ratoon cropping in endemic areas',
  ],
  biologicalControl: [
    'Release of egg parasitoids (Anagrus spp.)',
    'Conservation of mirid bugs (Cyrtorhinus lividipennis)',
    'Entomopathogenic fungi (Beauveria bassiana)',
  ],
  pesticideCategory: 'Neonicotinoids (Imidacloprid/Thiamethoxam) or Pyrethroids - only when economic threshold exceeded',
  safetyPrecautions: 'Follow label instructions strictly. Use recommended dose only. Wear protective gear. Observe pre-harvest interval. Avoid spraying during flowering to protect pollinators. Rotate chemical classes to prevent resistance.',
}