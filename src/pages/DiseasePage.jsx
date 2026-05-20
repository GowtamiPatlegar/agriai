import { useLanguage } from '../contexts/useLanguage'
import DiseaseDetection from '../sections/DiseaseDetection'

export default function DiseasePage() {
  const { t } = useLanguage()

  return <DiseaseDetection aria-label={t.disease.eyebrow} />
}
