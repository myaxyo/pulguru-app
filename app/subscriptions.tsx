import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { C } from '../constants/Colors';
import { subscriptions } from '../constants/Data';

function fmt(v: number) { return `${(v / 1000).toFixed(0)}K`; }

export default function SubscriptionsScreen() {
  const active = subscriptions.filter(s => s.status === 'active');
  const inactive = subscriptions.filter(s => s.status === 'inactive');
  const totalMonthly = active.reduce((s, sub) => s + sub.amount, 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['top']}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={20} color={C.emerald} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Ionicons name="wifi" size={18} color={C.emerald} />
            <Text style={s.title}>Obunalar</Text>
          </View>
          <Text style={s.sub}>SMS orqali aniqlangan obunalar</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}>
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 16, marginBottom: 16 }}>
          <View style={s.statCard}><Text style={s.statLbl}>Oylik</Text><Text style={[s.statVal, { color: C.red }]}>{fmt(totalMonthly)}</Text><Text style={s.statUnit}>UZS</Text></View>
          <View style={s.statCard}><Text style={s.statLbl}>Yillik</Text><Text style={[s.statVal, { color: C.navy }]}>{(totalMonthly * 12 / 1000000).toFixed(1)}M</Text><Text style={s.statUnit}>UZS</Text></View>
        </View>

        <LinearGradient colors={[C.navy, '#1e3a5f']} style={s.aiCard}>
          <View style={[s.aiIcon, { backgroundColor: 'rgba(239,68,68,0.2)' }]}><Ionicons name="trending-down" size={16} color="#FCA5A5" /></View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, fontWeight: '700', color: C.red, marginBottom: 4 }}>AI tavsiyasi</Text>
            <Text style={{ fontSize: 13, color: C.white, fontWeight: '500', lineHeight: 18 }}>
              <Text style={{ color: '#FCA5A5' }}>2 ta obuna</Text> — Netflix va Canva Pro — so'nggi 2 oy davomida kamdan-kam ishlatilgan. Bekor qilish <Text style={{ color: C.emeraldLight }}>94,000 UZS/oy</Text> tejaydi.
            </Text>
          </View>
        </LinearGradient>

        <View style={s.secHeader}>
          <Text style={s.secTitle}>Aktiv obunalar</Text>
          <View style={s.cntBadge}><Text style={{ fontSize: 11, fontWeight: '700', color: C.emerald }}>{active.length} ta</Text></View>
        </View>
        {active.map(sub => (
          <View key={sub.id} style={s.subRow}>
            <View style={[s.subIcon, { backgroundColor: sub.color + '20' }]}><Text style={{ fontSize: 22 }}>{sub.icon}</Text></View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={s.subName}>{sub.name}</Text>
                {sub.detected && <View style={s.smsBadge}><Ionicons name="wifi" size={9} color={C.emerald} /></View>}
              </View>
              <Text style={s.subCat}>{sub.category} • {sub.cycle}</Text>
            </View>
            <Text style={{ fontSize: 13, fontWeight: '700', color: C.red }}>-{fmt(sub.amount)} UZS</Text>
          </View>
        ))}

        {inactive.length > 0 && (
          <>
            <View style={[s.secHeader, { marginTop: 8 }]}>
              <Ionicons name="warning-outline" size={14} color={C.gold} />
              <Text style={s.secTitle}>Bekor qilish mumkin</Text>
            </View>
            {inactive.map(sub => (
              <View key={sub.id} style={[s.subRow, { opacity: 0.7, borderColor: 'rgba(245,158,11,0.3)' }]}>
                <View style={[s.subIcon, { backgroundColor: C.muted }]}><Text style={{ fontSize: 22 }}>{sub.icon}</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={s.subName}>{sub.name}</Text>
                  <Text style={s.subCat}>Kam ishlatilmoqda</Text>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                  <Text style={{ fontSize: 11, fontWeight: '600', color: C.gold }}>Bekor qilish</Text>
                  <Ionicons name="chevron-forward" size={11} color={C.gold} />
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        <View style={s.comingSoon}>
          <Text style={{ fontSize: 12, fontWeight: '600', color: C.textMuted, marginBottom: 8 }}>Tez kunda:</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {['Click', 'Payme'].map(name => (
              <View key={name} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.card, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1, borderColor: C.border, opacity: 0.6 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: C.textMuted }}>{name}</Text>
                <View style={{ backgroundColor: C.muted, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 }}><Text style={{ fontSize: 10, color: C.textMuted }}>Breve</Text></View>
              </View>
            ))}
          </View>
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
  statCard: { flex: 1, backgroundColor: C.card, borderRadius: 18, padding: 16, borderWidth: 1, borderColor: C.border },
  statLbl: { fontSize: 12, color: C.textMuted, marginBottom: 4 },
  statVal: { fontSize: 24, fontWeight: '800' },
  statUnit: { fontSize: 11, color: C.textMuted, marginTop: 2 },
  aiCard: { borderRadius: 18, padding: 14, flexDirection: 'row', gap: 12, marginBottom: 20 },
  aiIcon: { width: 32, height: 32, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  secHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  secTitle: { fontSize: 14, fontWeight: '600', color: C.navy, flex: 1 },
  cntBadge: { backgroundColor: C.emeraldMuted, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  subRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.card, borderRadius: 18, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: C.border },
  subIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  subName: { fontSize: 14, fontWeight: '600', color: C.navy },
  subCat: { fontSize: 11, color: C.textMuted, marginTop: 2 },
  smsBadge: { backgroundColor: C.emeraldMuted, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 6 },
  comingSoon: { backgroundColor: C.muted, borderRadius: 16, padding: 16, marginTop: 8, borderWidth: 1, borderColor: C.border },
});
