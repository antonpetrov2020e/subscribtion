import { AppLayout } from '@/components/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Wallet, TrendingUp, CreditCard, AlertCircle } from 'lucide-react'

export default function Home() {
  // Временные данные для демонстрации
  const stats = [
    {
      title: 'Общие расходы в месяц',
      value: '0 ₽',
      description: 'В рублёвом эквиваленте',
      icon: Wallet,
    },
    {
      title: 'Активных подписок',
      value: '0',
      description: 'Отслеживаемых сервисов',
      icon: TrendingUp,
    },
    {
      title: 'Подключённых карт',
      value: '0',
      description: 'Источников оплаты',
      icon: CreditCard,
    },
    {
      title: 'Ближайший платёж',
      value: 'Нет данных',
      description: 'Следующее списание',
      icon: AlertCircle,
    },
  ]

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Дашборд</h1>
          <p className="text-muted-foreground">
            Добро пожаловать в SubManager. Здесь вы увидите сводку по вашим подпискам.
          </p>
        </div>

        {/* Статистические карточки в стиле Bento Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Пустое состояние */}
        <Card>
          <CardHeader>
            <CardTitle>Начните с добавления карты</CardTitle>
            <CardDescription>
              Для отслеживания подписок сначала добавьте карту, с которой происходят списания.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Перейдите в раздел &quot;Карты&quot; чтобы добавить вашу первую карту.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
