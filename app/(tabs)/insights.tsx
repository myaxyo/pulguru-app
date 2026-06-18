import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../constants/Colors';
import { weeklySpend, weekDays, categoryBreakdown } from '../../constants/Data';

const INSIGHTS = [
  { icon: 'warning-outline' as const, color: C.red, bg: C.redLight, title: "Restorana ko'proq sarfladingiz", desc: 'Bu oy restoranlar uchun byudjetdan 120,000 UZS oshib kettingiz.' },
  { icon: 'sparkles-outline' as const, color: C.emerald, bg: C.emeraldMuted, title: 'Oylik tejamkorlik potensiali', desc: 'Obunalar va restoran xarajatlarini optimallashtirish orqali oyiga 1,200,000 UZS tejashingiz mumkin.' },
  { icon: 'bulb-outline' as const, color: C.gold, bg: C.goldLight, title: 'Energiyani tejash tavsiyasi', desc: 'Kommunal to\'lovlaringiz yil boshidan 15% oshdi.' },
  { icon: 'trending-up-outline' as const, color: C.blue, bg: C.blueLight, title: "Daromad o'sishi", desc: 'So\'nggi 3 oy davomida daromadingiz barqaror oshib bormoqda!' },
];

export default function InsightsScreen() {
  const maxSpend = Math.max(...weeklySpend);
  const totalSpend = categoryBreakdown.reduce((s, c) => s + c.amount, 0);
  const totalBudget = categoryBreakdown.reduce((s, c) => s + c.budget, 0);
  const healthScore = Math.min(99, Math.round(60 + (1 - totalSpend / totalBudget) * 100));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['top']}>
      <View style={s.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Ionicons name="sparkles" size={20} color={C.emerald} />
          <Text style={s.title}>AI Tahlil</Text>
        </View>
        <Text style={s.sub}>Iyun 2026 • Barcha xarajatlar tahlili</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Health score */}
        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <LinearGradient colors={[C.navy, '#1e3a5f']} style={s.healthCard}>
            <View style={s.scoreDial}>
              <Text style={s.scoreNum}>{healthScore}</Text>
              <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>/100</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Moliyaviy sog'liq</Text>
              <View style={{ backgroundColor: 'rgba(0,178,111,0.2)', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginTop: 4 }}>
                <Text style={{ color: C.emeraldLight, fontSize: 11, fontWeight: '700' }}>Yaxshi ✓</Text>
              </View>
              <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>Byudjetingizning {Math.round(totalSpend / totalBudget * 100)}% ishlatildi</Text>
              <View style={[s.progressBg, { marginTop: 10 }]}>
                <View style={[s.progressFill, { width: `${Math.round(totalSpend / totalBudget * 100)}%` as any, backgroundColor: C.emerald }]} />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Weekly bars */}
        <View style={[s.card, { marginHorizontal: 20, marginTop: 16 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={s.cardTitle}>Haftalik xarajat</Text>
            <Text style={{ color: C.emerald, fontSize: 12, fontWeight: '600' }}>∅ 397K/kun</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 6, marginTop: 16, height: 100 }}>
            {weeklySpend.map((v, i) => (
              <View key={i} style={{ flex: 1, alignItems: 'center', gap: 6 }}>
                <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end' }}>
                  <View style={{ height: (v / maxSpend) * 80, backgroundColor: v === maxSpend ? C.red : C.emeraldMuted, borderRadius: 6, width: '100%' }} />
                </View>
                <Text style={{ fontSize: 10, color: C.textMuted }}>{weekDays[i]}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Category breakdown */}
        <View style={[s.card, { marginHorizontal: 20, marginTop: 16 }]}>
          <Text style={[s.cardTitle, { marginBottom: 16 }]}>Kategoriyalar bo'yicha</Text>
          {categoryBreakdown.map((cat, i) => {
            const pct = Math.min((cat.amount / cat.budget) * 100, 100);
            const over = cat.amount > cat.budget;
            return (
              <View key={i} style={{ marginBottom: 14 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontSize: 16 }}>{cat.icon}</Text>
                    <Text style={{ fontSize: 12, fontWeight: '600', color: C.navy }}>{cat.name}</Text>
                    {over && <View style={{ backgroundColor: C.redLight, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 }}><Text style={{ fontSize: 9, color: C.red, fontWeight: '700' }}>Oshdi</Text></View>}
                  </View>
                  <Text style={{ fontSize: 11, color: over ? C.red : C.textMuted }}>{(cat.amount/1000).toFixed(0)}K / {(cat.budget/1000).toFixed(0)}K</Text>
                </View>
                <View style={[s.progressBg, { marginTop: 8 }]}>
                  <View style={[s.progressFill, { width: `${pct}%` as any, backgroundColor: over ? C.red : cat.color }]} />
                </View>
              </View>
            );
          })}
        </View>

        {/* Insights */}
        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <Text style={[s.cardTitle, { marginBottom: 12 }]}>AI Tavsiyalari</Text>
          {INSIGHTS.map((ins, i) => (
            <View key={i} style={[s.insCard, { marginBottom: 10 }]}>
              <View style={[s.insIcon, { backgroundColor: ins.bg }]}>
                <Ionicons name={ins.icon} size={16} color={ins.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: C.navy }}>{ins.title}</Text>
                <Text style={{ fontSize: 11, color: C.textMuted, marginTop: 3, lineHeight: 16 }}>{ins.desc}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={C.textMuted} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header: { backgroundColor: C.card, borderBottomWidth: 1, borderBottomColor: C.border, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 14 },
  title: { fontSize: 20, fontWeight: '700', color: C.navy },
  sub: { fontSize: 12, color: C.textMuted, marginTop: 2 },
  healthCard: { borderRadius: 20, padding: 20, flexDirection: 'row', gap: 20, alignItems: 'center' },
  scoreDial: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  scoreNum: { fontSize: 28, fontWeight: '800', color: C.white },
  progressBg: { height: 8, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  card: { backgroundColor: C.card, borderRadius: 20, padding: 16, borderWidth: 1, borderColor: C.border },
  cardTitle: { fontSize: 14, fontWeight: '600', color: C.navy },
  insCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, backgroundColor: C.card, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: C.border },
  insIcon: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
});
