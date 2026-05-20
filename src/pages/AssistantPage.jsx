import { useLanguage } from '../contexts/useLanguage'
import FarmingChatbot from '../sections/FarmingChatbot'

export default function AssistantPage() {
  const { t } = useLanguage()

  return <FarmingChatbot aria-label={t.chatbot.eyebrow} />
}
