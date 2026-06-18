import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { C } from '../constants/Colors';
import { goals } from '../constants/Data';

function fmt(v: number) {
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
  return v.toLocaleString();
}

function monthsLeft(deadline: string) {
  const now = new Date(), end = new Date(deadline);
  return Math.max(0, (end.getFullYear() - now.getFullYear()) * 12 + (end.getMonth() - now.getMonth()));
}

const BADGES = [
  { icon: '🌱', label: 'Tejamkor', earned: true },
  { icon: '🔥', label: '30 kunlik', earned: true },
  { icon: '💎', label: '1M tejaldi', earned: true },
  { icon: '🎯', label: 'Maqsadga yaqin', earned: false },
  { icon: '🚀', label: '10M tejaldi', earned: false },
  { icon: '👑', label: 'Ekspert', earned: false },
];

export default function SavingsScreen() {
  const totalSaved = goals.reduce((s, g) => s + g.saved, 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['top']}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={20} color={C.emerald} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={s.title}>Tejamkorlik</Text>
          <Text style={s.sub}>Barcha tejamkorlik maqsadlari</Text>
        </View>
        <TouchableOpacity style={s.addBtn}><Ionicons name="add" size={20} color={C.white} /></TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}>
        <LinearGradient colors={[C.gold, C.goldDark]} style={s.totalCard}>
          <View style={s.trophyBg} />
          <Ionicons name="trophy" size={32} color={C.white} style={{ opacity: 0.9, alignSelf: 'center', marginBottom: 8 }} />
          <Text style={s.totalLbl}>Jami tejalgan</Text>
          <Text style={s.totalAmt}>{fmt(totalSaved)}</Text>
          <Text style={s.totalCur}>UZS</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 10 }}>
            <Ionicons name="flash" size={13} color="rgba(255,255,255,0.7)" />
            <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{goals.length} ta aktiv maqsad</Text>
          </View>
        </LinearGradient>

        <Text style={[s.secTitle, { marginTop: 20, marginBottom: 12 }]}>Maqsadlarim</Text>
        {goals.map(goal => {
          const pct = Math.min((goal.saved / goal.target) * 100, 100);
          const months = monthsLeft(goal.deadline);
          const onTrack = goal.saved + goal.monthly * months >= goal.target;
          return (
            <View key={goal.id} style={s.goalCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <View style={[s.goalIcon, { backgroundColor: goal.color + '20' }]}>
                  <Text style={{ fontSize: 26 }}>{goal.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={s.goalName}>{goal.name}</Text>
                    <Text style={{ fontSize: 18 }}>{goal.badge}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <View style={[s.trackBadge, { backgroundColor: onTrack ? C.emeraldMuted : C.redLight }]}>
                      <Text style={{ fontSize: 10, fontWeight: '700', color: onTrack ? C.emerald : C.red }}>{onTrack ? "✓ Yo'lda" : '⚡ Oshirish kerak'}</Text>
                    </View>
                    <Text style={{ fontSize: 11, color: C.textMuted }}>{months} oy qoldi</Text>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <View><Text style={{ fontSize: 11, color: C.textMuted }}>Tejalgan</Text><Text style={[s.goalSaved, { color: goal.color }]}>{fmt(goal.saved)} UZS</Text></View>
                <View style={{ alignItems: 'flex-end' }}><Text style={{ fontSize: 11, color: C.textMuted }}>Maqsad</Text><Text style={{ fontSize: 14, fontWeight: '700', color: C.navy }}>{fmt(goal.target)} UZS</Text></View>
              </View>
              <View style={s.progBg}><View style={[s.progFill, { width: `${pct}%` as any, backgroundColor: goal.color }]} /></View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
                <Text style={{ fontSize: 11, fontWeight: '700', color: goal.color }}>{Math.round(pct)}% tayyor</Text>
                <Text style={{ fontSize: 11, color: C.textMuted }}>+{fmt(goal.monthly)}/oy</Text>
              </View>
              {pct < 100 && (
                <View style={s.remaining}>
                  <Text style={{ fontSize: 12, color: C.textMuted }}>Qolgan: <Text style={{ fontWeight: '600', color: C.navy }}>{fmt(goal.target - goal.saved)} UZS</Text></Text>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                    <Text style={{ fontSize: 12, fontWeight: '600', color: C.emerald }}>To'ldirish</Text>
                    <Ionicons name="chevron-forward" size={13} color={C.emerald} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}

        <Text style={[s.secTitle, { marginBottom: 12 }]}>Yutuqlar</Text>
        <View style={s.badgesGrid}>
          {BADGES.map((b, i) => (
            <View key={i} style={[s.badgeCard, { opacity: b.earned ? 1 : 0.4, borderColor: b.earned ? C.gold : 'transparent', backgroundColor: b.earned ? C.card : C.muted }]}>
              <Text style={{ fontSize: 28 }}>{b.icon}</Text>
              <Text style={{ fontSize: 10, fontWeight: '600', color: b.earned ? C.navy : C.textMuted, textAlign: 'center', marginTop: 4 }}>{b.label}</Text>
              {b.earned && <Ionicons name="star" size={12} color={C.gold} style={{ marginTop: 2 }} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header: { backgroundColor: C.card, borderBottomWidth: 1, borderBottomColor: C.border, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: C.emeraldMuted, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '700', color: C.navy },
  sub: { fontSize: 12, color: C.textMuted },
  addBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: C.emerald, alignItems: 'center', justifyContent: 'center' },
  totalCard: { borderRadius: 22, padding: 24, alignItems: 'center', marginTop: 16, overflow: 'hidden' },
  trophyBg: { position: 'absolute', top: -32, right: -32, width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.1)' },
  totalLbl: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  totalAmt: { fontSize: 44, fontWeight: '800', color: C.white },
  totalCur: { fontSize: 16, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  secTitle: { fontSize: 14, fontWeight: '600', color: C.navy },
  goalCard: { backgroundColor: C.card, borderRadius: 22, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: C.border },
  goalIcon: { width: 52, height: 52, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  goalName: { fontSize: 15, fontWeight: '700', color: C.navy },
  trackBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  goalSaved: { fontSize: 18, fontWeight: '800', marginTop: 2 },
  progBg: { height: 12, backgroundColor: C.muted, borderRadius: 6, overflow: 'hidden' },
  progFill: { height: '100%', borderRadius: 6 },
  remaining: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, backgroundColor: C.muted, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10 },
  badgesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  badgeCard: { width: '30%', alignItems: 'center', padding: 14, borderRadius: 18, borderWidth: 1 },
});
