"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, TrendingUp, Users, BarChart3, FileText, Search, Target, AlertTriangle, Cloud } from "lucide-react"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

const faqItems = [
  {
    question: "Какой главный эффект от внедрения AI-ассистента в процесс маркетинговых исследований?",
    answer:
      "AI-ассистент значительно сокращает время анализа данных: инсайты, которые раньше получались за недели, теперь доступны за несколько часов. Это позволяет быстрее принимать обоснованные решения и опережать конкурентов.",
  },
  {
    question: "С какими данными работает AI-ассистент?",
    answer:
      "Ассистент анализирует накопленные записи звонков в вашей компании. На вход система может принимать уже транскрибированные звонки в формате xlsx которые выдает ваша система транскрибации(например 3i tech) либо транскрибировать звонки самостоятельно(на вход wav или mp3 звонков).",
  },
  {
    question: "Можно ли провести “пробное” исследование до запуска анализа по всей базе?",
    answer:
      "Да, предусмотрена возможность тестового запуска исследования на небольшой выборке (по умолчанию 5% звонков). Это позволяет оценить качество и релевантность результатов перед масштабным анализом.",
  },
  {
    question: "Какие форматы результатов выдает ассистент?",
    answer:
      "Результаты исследования можно получить в трех видах: подробная таблица, визуализация (графики) и текстовые выводы с Action Plan (конкретными рекомендациями и списком клиентов с выявленными проблемами).",
  },
  {
    question: "Для кого подойдет ваш продукт?",
    answer:
      "AI-ассистент оптимален для маркетологов, продакт-менеджеров, аналитиков и исследователей средних и крупных B2C/B2B компаний, у которых есть контакт-центр и регулярно проводятся клиентские исследования. Особенно полезен тем, кто хочет ускорить работу с инсайтами и сократить затраты на маркетинговую аналитику.",
  },
]

export default function LandingPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
  })
  const [isConsentChecked, setIsConsentChecked] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Плавный скролл к форме
  const scrollToForm = () => {
    document.getElementById("form")?.scrollIntoView({ behavior: "smooth" })
  }

  // Валидация формы
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно для заполнения"
    }

    if (!formData.company.trim()) {
      newErrors.company = "Название компании обязательно для заполнения"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон обязателен для заполнения"
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Введите корректный номер телефона"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен для заполнения"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Введите корректный email адрес"
    }

    if (!isConsentChecked) {
      newErrors.consent = "Поле обязательно для заполнения"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', company: '', phone: '', email: '' });
        setIsConsentChecked(false);
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert('Ошибка: ' + data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Не удалось отправить форму. Проверьте подключение.');
    }
  };

  // Анимация появления секций при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".fade-in-section").forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleConsentAccept = () => {
    setIsConsentChecked(true)
    setIsModalOpen(false)
  }

  const handleConsentDecline = () => {
    setIsConsentChecked(false)
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Герой-секция */}
      <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-20 px-4 sm:px-6 lg:px-8 font-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-blue-700 leading-tight font-bold text-7xl">Vox Sense</h1>
              <p className="text-3xl text-slate-800 font-bold leading-tight">
                Инсайты из данных звонков за часы, а не недели
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Быстро анализируйте накопленные звонки и переписки с помощью LLM. Получайте частотность, графики и
                выводы без новых интервью.
              </p>
              <Button
                onClick={scrollToForm}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Записаться на консультацию
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/images/dashboard-screenshot.png"
                alt="Интерфейс AI-ассистента - формулировка запроса для анализа звонков"
                width={800}
                height={650}
                className="rounded-xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Описание продукта */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 fade-in-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Как работает AI-ассистент</h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              AI-ассистент на базе LLM позволяет проводить исследования по накопленным данным звонков и переписок с
              минимальными затратами. Все в одном окне: анализ запроса по брифу, детальный разбор каждого звонка с
              учетом контекста, выводы с частотностью, графиками, списком клиентов с проблемами и Action Plan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Ключевые особенности:</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Search className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-slate-700">Получает и анализирует краткий бриф пользователя</p>
                </div>
                <div className="flex items-start space-x-3">
                  <BarChart3 className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-slate-700">
                    Анализирует звонки по критериям с пониманием смысла, а не ключевых слов
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-slate-700">Выводит результаты с частотностью, визуализациями и рекомендациями</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Cloud className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-slate-700">
                    Возможны On-prem и Cloud варианты установки. В случае On-prem установки используются локальные LLM,
                    данные остаются в контуре компании.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-xl shadow-lg max-w-2xl w-full">
                <Image
                  src="/images/bar-chart-screenshot.png"
                  alt="Результаты анализа звонков - столбчатая диаграмма с распределением по категориям"
                  width={1200}
                  height={800}
                  className="rounded-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 fade-in-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Преимущества AI-ассистента</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Ускорение до 90%</h3>
                <p className="text-slate-600">Исследования за часы вместо недель</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Экономия ФОТ до x4</h3>
                <p className="text-slate-600">Сокращение затрат на маркетологов и исследователей</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Неочевидные инсайты</h3>
                <p className="text-slate-600">Без повторных опросов клиентов</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Оптимизация процессов</h3>
                <p className="text-slate-600">Обоснованные решения на основе данных</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-xl text-slate-600 max-w-4xl mx-auto mt-16 leading-relaxed">
            AI-ассистент оптимален для маркетологов, продакт-менеджеров, аналитиков и исследователей средних и крупных
            B2C/B2B компаний, у которых есть контакт-центр и регулярно проводятся клиентские исследования. Особенно
            полезен тем, кто хочет ускорить работу с инсайтами и сократить затраты на маркетинговую аналитику.
          </p>
        </div>
      </section>

      {/* Функционал */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 fade-in-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Функционал AI-ассистента</h2>
            <p className="text-xl text-slate-600">Полный цикл анализа от загрузки до результатов</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Что включает функционал:</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Выбор и загрузка звонков</h4>
                    <p className="text-slate-600">По дате или вручную для точного анализа</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Создание запроса</h4>
                    <p className="text-slate-600">По шаблону или с нуля; AI помогает уточнять вопросы</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Тестовый запуск</h4>
                    <p className="text-slate-600">На 5% звонков для проверки качества анализа</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Полный анализ</h4>
                    <p className="text-slate-600">Результаты в таблице, визуализациях и выводах с Action Plan</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Сохранение истории</h4>
                    <p className="text-slate-600">Все запросы сохраняются для повторного использования</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Image
                src="/images/work-in-progress.png"
                alt="Процесс выполнения запроса AI-ассистентом"
                width={500}
                height={300}
                className="rounded-xl shadow-lg"
              />
              <Image
                src="/images/action-plan.png"
                alt="Выводы и Action Plan на основе анализа звонков"
                width={500}
                height={300}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Записаться на консультацию
            </Button>
          </div>
        </div>
      </section>

      {/* Секция FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 fade-in-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Часто задаваемые вопросы</h2>
            <p className="text-xl text-slate-600">Найдите ответы на самые популярные вопросы о нашем AI-ассистенте.</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold text-slate-800 hover:text-blue-600">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-700 text-base leading-relaxed">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Форма записи */}
      <section id="form" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 fade-in-section">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Запишитесь на консультацию</h2>
            <p className="text-xl text-slate-300">
              Узнайте, как AI-ассистент может оптимизировать ваши маркетинговые исследования
            </p>
          </div>

          {isSubmitted && (
            <div className="mb-8 p-6 bg-green-600 text-white rounded-lg text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2" />
              <p className="text-lg font-semibold">Спасибо! Мы свяжемся с вами скоро</p>
            </div>
          )}

          <Card className="shadow-2xl bg-white">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                    Имя *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`mt-1 bg-white text-slate-900 placeholder:text-slate-500 ${errors.name ? "border-red-500" : ""}`}
                    placeholder="Ваше имя"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="company" className="text-sm font-medium text-slate-700">
                    Название компании *
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={`mt-1 bg-white text-slate-900 placeholder:text-slate-500 ${errors.company ? "border-red-500" : ""}`}
                    placeholder="Название вашей компании"
                  />
                  {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                    Телефон *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`mt-1 bg-white text-slate-900 placeholder:text-slate-500 ${errors.phone ? "border-red-500" : ""}`}
                    placeholder="+7 (999) 123-45-67"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`mt-1 bg-white text-slate-900 placeholder:text-slate-500 ${errors.email ? "border-red-500" : ""}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="flex items-center space-x-2">
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                      <Checkbox
                        id="consent"
                        checked={isConsentChecked}
                        onCheckedChange={() => setIsModalOpen(true)} // Открываем модалку при попытке изменить чекбокс
                        className={`${errors.consent ? "border-red-500" : ""}`}
                      />
                    </DialogTrigger>
                    <Label htmlFor="consent" className="text-sm font-medium text-slate-700 cursor-pointer">
                      Я согласен на обработку персональных данных
                    </Label>
                    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-white">
                      <DialogHeader>
                        <DialogTitle>Согласие на обработку персональных данных</DialogTitle>
                        <DialogDescription className="sr-only">
                          Текст согласия на обработку персональных данных
                        </DialogDescription>
                      </DialogHeader>
                      <div className="text-sm text-slate-700 space-y-4 leading-relaxed">
                        <p>
                          Настоящим в соответствии с Федеральным законом № 152-ФЗ «О персональных данных» от 27.07.2006
                          года Вы подтверждаете свое согласие на обработку компанией TRASSIR персональных данных: сбор,
                          систематизацию, накопление, хранение, уточнение (обновление, изменение), использование,
                          передачу исключительно в целях продажи программного обеспечения на Ваше имя, как это описано
                          ниже, блокирование, обезличивание, уничтожение.
                        </p>
                        <p>
                          Компания TRASSIR гарантирует конфиденциальность получаемой информации. Обработка персональных
                          данных осуществляется в целях эффективного исполнения заказов, договоров и иных обязательств,
                          принятых компанией TRASSIR в качестве обязательных к исполнению.
                        </p>
                        <p>
                          В случае необходимости предоставления Ваших персональных данных правообладателю, дистрибьютору
                          или реселлеру программного обеспечения в целях регистрации программного обеспечения на Ваше
                          имя, Вы даёте согласие на передачу Ваших персональных данных. Компания TRASSIR гарантирует,
                          что правообладатель, дистрибьютор или реселлер программного обеспечения осуществляет защиту
                          персональных данных на условиях, аналогичных изложенным в Политике конфиденциальности
                          персональных данных.
                        </p>
                        <p>
                          Настоящее согласие распространяется на следующие Ваши персональные данные: фамилия, имя и
                          отчество, адрес электронной почты, почтовый адрес доставки заказов, контактный телефон,
                          платёжные реквизиты.
                        </p>
                        <p>Срок действия согласия является неограниченным.</p>
                        <p>
                          Вы можете в любой момент отозвать настоящее согласие, направив письменное уведомления на
                          адрес: Москва, ул. Бакунинская, д. 71 с пометкой «Отзыв согласия на обработку персональных
                          данных».
                        </p>
                        <p>
                          Обращаем Ваше внимание, что отзыв согласия на обработку персональных данных влечёт за собой
                          удаление Вашей учётной записи с Интернет-сайта https://trassir.ru, а также уничтожение
                          записей, содержащих Ваши персональные данные, в системах обработки персональных данных
                          компании TRASSIR, что может сделать невозможным пользование интернет-сервисами компании
                          TRASSIR.
                        </p>
                        <p>
                          Гарантирую, что представленная мной информация является полной, точной и достоверной, а также
                          что при представлении информации не нарушаются действующее законодательство Российской
                          Федерации, законные права и интересы третьих лиц. Вся представленная информация заполнена мною
                          в отношении себя лично.
                        </p>
                        <p>
                          Настоящее согласие действует в течение всего периода хранения персональных данных, если иное
                          не предусмотрено законодательством Российской Федерации.
                        </p>
                      </div>
                      <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-4 pt-4">
                        <Button
                          type="button"
                          onClick={handleConsentAccept}
                          className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
                        >
                          Принимаю
                        </Button>
                        <Button
                          type="button"
                          onClick={handleConsentDecline}
                          variant="outline"
                          className="border-red-700 text-red-700 hover:bg-red-50 hover:text-red-800 px-6 py-3 rounded-lg font-semibold bg-transparent"
                        >
                          Не принимаю
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                {errors.consent && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    {errors.consent}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-red-700 hover:bg-red-800 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-slate-900 py-8 px-4 sm:px-6 lg:px-8 text-center text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto">
          <p>&copy; {new Date().getFullYear()} AI-ассистент маркетолога. Все права защищены.</p>
          <p className="mt-2">
            <a href="#" className="hover:text-white transition-colors duration-200">
              Политика конфиденциальности
            </a>{" "}
            |{" "}
            <a href="#" className="hover:text-white transition-colors duration-200">
              Условия использования
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
