import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { C } from '../constants/Colors';

const STEPS = ['welcome', 'benefits', 'permissions', 'language', 'profile'] as const;
type Step = typeof STEPS[number];

const LANGUAGES = [
  { code: 'uz', label: "O'zbekcha", flag: '🇺🇿' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

export default function OnboardingScreen() {
  const [step, setStep] = useState<Step>('welcome');
  const [lang, setLang] = useState('uz');
  const [name, setName] = useState('');
  const [sms, setSms] = useState(false);
  const [notif, setNotif] = useState(false);

  const stepIndex = STEPS.indexOf(step);
  const next = () => {
    if (stepIndex < STEPS.length - 1) setStep(STEPS[stepIndex + 1]);
    else router.replace('/(tabs)');
  };

  const Btn = ({ label, onPress }: { label: string; onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <LinearGradient colors={[C.emerald, C.emeraldDark]} style={s.btn}>
        <Text style={s.btnText}>{label}</Text>
        <Ionicons name="chevron-forward" size={20} color={C.white} />
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      {step !== 'welcome' && (
        <View style={s.dots}>
          {STEPS.slice(1).map((_, i) => (
            <View key={i} style={[s.dot, { width: i < stepIndex ? 24 : 8, backgroundColor: i < stepIndex ? C.emerald : C.muted }]} />
          ))}
        </View>
      )}

      {step === 'welcome' && (
        <View style={s.page}>
          <View style={{ alignItems: 'center', gap: 16 }}>
            <LinearGradient colors={[C.emerald, C.emeraldDark]} style={s.logoBox}>
              <Text style={{ fontSize: 48 }}>💰</Text>
            </LinearGradient>
            <Text style={s.logoText}>Pul<Text style={{ color: C.emerald }}>Guru</Text></Text>
            <Text style={{ fontSize: 14, color: C.textMuted }}>Aqlli moliyaviy yordamchingiz</Text>
            {[{ e: '📩', t: 'SMS orqali avtomatik xarajat aniqlash' }, { e: '🤖', t: 'AI yordamida moliyaviy tahlil' }, { e: '🎯', t: 'Byudjet va tejamkorlik maqsadlari' }].map((f, i) => (
              <View key={i} style={s.featRow}>
                <Text style={{ fontSize: 22 }}>{f.e}</Text>
                <Text style={{ fontSize: 13, fontWeight: '600', color: C.navy, flex: 1 }}>{f.t}</Text>
              </View>
            ))}
          </View>
          <Btn label="Boshlash" onPress={next} />
        </View>
      )}

      {step === 'benefits' && (
        <View style={s.page}>
          <Text style={s.stepTitle}>Nima uchun PulGuru?</Text>
          <Text style={s.stepSub}>Bank API siz ishlaydi — faqat SMS orqali</Text>
          <View style={{ flex: 1, gap: 12 }}>
            {[
              { icon: 'chatbubble-outline' as const, color: C.emerald, bg: C.emeraldMuted, title: 'SMS orqali avtomatik aniqlash', desc: 'Uzcard, Humo yoki Click SMS larini avtomatik kategoriyalaydi' },
              { icon: 'trending-up-outline' as const, color: C.blue, bg: C.blueLight, title: 'AI tahlil va prognozlar', desc: 'Xarajat tendentsiyalarini tahlil qiladi va tejamkorlik tavsiyalarini beradi' },
              { icon: 'shield-checkmark-outline' as const, color: C.gold, bg: C.goldLight, title: 'Maxfiylik kafolati', desc: "Barcha ma'lumotlar faqat qurilmangizda saqlanadi" },
            ].map((item, i) => (
              <View key={i} style={s.benefitCard}>
                <View style={[s.benefitIcon, { backgroundColor: item.bg }]}>
                  <Ionicons name={item.icon} size={24} color={item.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 13, fontWeight: '600', color: C.navy }}>{item.title}</Text>
                  <Text style={{ fontSize: 11, color: C.textMuted, marginTop: 3, lineHeight: 16 }}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>
          <Btn label="Davom etish" onPress={next} />
        </View>
      )}

      {step === 'permissions' && (
        <View style={s.page}>
          <Text style={s.stepTitle}>Ruxsatlar</Text>
          <Text style={s.stepSub}>Ilovani to'liq ishlatish uchun quyidagi ruxsatlar kerak</Text>
          <View style={{ flex: 1, gap: 12 }}>
            <TouchableOpacity onPress={() => setSms(!sms)} activeOpacity={0.85}
              style={[s.permCard, { borderColor: sms ? C.emerald : C.border, backgroundColor: sms ? C.emeraldMuted : C.card }]}>
              <View style={[s.permIcon, { backgroundColor: sms ? C.emerald : C.muted }]}>
                <Ionicons name="chatbubble-outline" size={20} color={sms ? C.white : C.textMuted} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: C.navy }}>SMS o'qish ruxsati</Text>
                <Text style={{ fontSize: 11, color: C.textMuted, marginTop: 3 }}>Bank SMS laridan tranzaksiyalarni aniqlash</Text>
                <View style={{ backgroundColor: C.emeraldMuted, alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginTop: 6 }}>
                  <Text style={{ fontSize: 10, fontWeight: '600', color: C.emerald }}>Asosiy funksiya</Text>
                </View>
              </View>
              {sms && <Ionicons name="checkmark-circle" size={22} color={C.emerald} />}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setNotif(!notif)} activeOpacity={0.85}
              style={[s.permCard, { borderColor: notif ? C.blue : C.border, backgroundColor: notif ? C.blueLight : C.card }]}>
              <View style={[s.permIcon, { backgroundColor: notif ? C.blue : C.muted }]}>
                <Ionicons name="notifications-outline" size={20} color={notif ? C.white : C.textMuted} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: C.navy }}>Bildirishnomalar</Text>
                <Text style={{ fontSize: 11, color: C.textMuted, marginTop: 3 }}>Byudjet ogohlantirishlari va AI tavsiyalari</Text>
                <View style={{ backgroundColor: C.blueLight, alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginTop: 6 }}>
                  <Text style={{ fontSize: 10, fontWeight: '600', color: C.blue }}>Ixtiyoriy</Text>
                </View>
              </View>
              {notif && <Ionicons name="checkmark-circle" size={22} color={C.blue} />}
            </TouchableOpacity>
            <Text style={{ fontSize: 12, color: C.textMuted, textAlign: 'center', lineHeight: 18 }}>🔒 Barcha ma'lumotlar qurilmangizda saqlanadi</Text>
          </View>
          <Btn label="Davom etish" onPress={next} />
        </View>
      )}

      {step === 'language' && (
        <View style={s.page}>
          <Text style={s.stepTitle}>Tilni tanlang</Text>
          <Text style={s.stepSub}>Choose your preferred language</Text>
          <View style={{ flex: 1, gap: 12 }}>
            {LANGUAGES.map((l) => (
              <TouchableOpacity key={l.code} onPress={() => setLang(l.code)} activeOpacity={0.85}
                style={[s.langCard, { borderColor: lang === l.code ? C.emerald : C.border, backgroundColor: lang === l.code ? C.emeraldMuted : C.card }]}>
                <Text style={{ fontSize: 32 }}>{l.flag}</Text>
                <Text style={{ flex: 1, fontSize: 16, fontWeight: '600', color: C.navy }}>{l.label}</Text>
                {lang === l.code && (
                  <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: C.emerald, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="checkmark" size={14} color={C.white} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
          <Btn label="Davom etish" onPress={next} />
        </View>
      )}

      {step === 'profile' && (
        <View style={s.page}>
          <Text style={s.stepTitle}>Profilingiz</Text>
          <Text style={s.stepSub}>Ismingizni kiriting</Text>
          <View style={{ flex: 1, gap: 16 }}>
            <View>
              <Text style={{ fontSize: 11, fontWeight: '700', color: C.textMuted, letterSpacing: 1, marginBottom: 8 }}>ISM</Text>
              <TextInput
                style={{ backgroundColor: C.card, borderWidth: 2, borderColor: C.border, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: C.text }}
                placeholder="Masalan: Alisher"
                placeholderTextColor={C.textMuted}
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={{ backgroundColor: C.emeraldMuted, borderRadius: 16, padding: 16, flexDirection: 'row', gap: 12 }}>
              <Text style={{ fontSize: 20 }}>🎉</Text>
              <Text style={{ fontSize: 13, color: C.emeraldDark, flex: 1, lineHeight: 18 }}>Siz foydalanuvchilar orasida eng aqlli 5% ga kirasiz. PulGuru moliyaviy erkinlik topishda yordam beradi.</Text>
            </View>
          </View>
          <Btn label={name ? `Salom, ${name}! 👋` : 'Ilovani boshlash'} onPress={next} />
        </View>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, paddingTop: 16, paddingBottom: 8 },
  dot: { height: 4, borderRadius: 2 },
  page: { flex: 1, paddingHorizontal: 24, paddingBottom: 24, paddingTop: 20, justifyContent: 'space-between' },
  logoBox: { width: 96, height: 96, borderRadius: 28, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 12, elevation: 8 },
  logoText: { fontSize: 36, fontWeight: '800', color: C.navy },
  featRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.emeraldMuted, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12, width: '100%' },
  btn: { borderRadius: 20, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, shadowColor: C.emerald, shadowOpacity: 0.3, shadowRadius: 12, elevation: 6 },
  btnText: { color: C.white, fontWeight: '700', fontSize: 16 },
  stepTitle: { fontSize: 24, fontWeight: '700', color: C.navy, marginBottom: 4 },
  stepSub: { fontSize: 13, color: C.textMuted, marginBottom: 16 },
  benefitCard: { flexDirection: 'row', gap: 16, padding: 16, backgroundColor: C.card, borderRadius: 20, borderWidth: 1, borderColor: C.border },
  benefitIcon: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  permCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 16, padding: 20, borderRadius: 20, borderWidth: 2 },
  permIcon: { width: 44, height: 44, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  langCard: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, borderRadius: 20, borderWidth: 2 },
});
