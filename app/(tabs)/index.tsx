import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { C } from '../../constants/Colors';
import { transactions } from '../../constants/Data';

function fmt(n: number) {
  const a = Math.abs(n);
  if (a >= 1000000) return `${(a / 1000000).toFixed(1)}M`;
  if (a >= 1000) return `${(a / 1000).toFixed(0)}K`;
  return a.toLocaleString();
}

export default function HomeScreen() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const recent = transactions.slice(0, 5);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        <LinearGradient colors={[C.navy, C.navyMid]} style={s.header}>
          <View style={s.headerTop}>
            <View>
              <Text style={s.greeting}>Xush kelibsiz 👋</Text>
              <Text style={s.userName}>Alisher</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity style={s.iconBtn}>
                <Ionicons name="notifications-outline" size={20} color={C.white} />
                <View style={s.notifDot} />
              </TouchableOpacity>
              <View style={s.avatar}>
                <Text style={s.avatarTxt}>AG</Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Text style={s.balLabel}>Taxminiy balans</Text>
              <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
                <Ionicons name={balanceVisible ? 'eye-outline' : 'eye-off-outline'} size={14} color="rgba(255,255,255,0.5)" />
              </TouchableOpacity>
            </View>
            <Text style={s.balAmt}>
              {balanceVisible ? '12 850 000' : '• • • • •'}
              <Text style={s.balCur}>  UZS</Text>
            </Text>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
              <View style={s.statChip}>
                <Ionicons name="arrow-up" size={12} color="#6EE7B7" />
                <Text style={[s.statTxt, { color: '#6EE7B7' }]}>6.8M daromad</Text>
              </View>
              <View style={[s.statChip, { backgroundColor: 'rgba(239,68,68,0.2)' }]}>
                <Ionicons name="arrow-down" size={12} color="#FCA5A5" />
                <Text style={[s.statTxt, { color: '#FCA5A5' }]}>4.25M xarajat</Text>
              </View>
            </View>
          </View>

          <View style={s.smsBadge}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: C.emerald }} />
            <Ionicons name="chatbubble-outline" size={11} color="rgba(255,255,255,0.5)" />
            <Text style={s.smsTxt}>SMS faol • 47 tranzaksiya aniqlandi</Text>
          </View>
        </LinearGradient>

        {/* Quick actions */}
        <View style={s.qaRow}>
          {[
            { icon: 'add', label: "Qo'shish", primary: true, onPress: () => router.push('/add-transaction') },
            { icon: 'trending-down-outline', label: 'Xarajat', onPress: () => router.push('/add-transaction') },
            { icon: 'trending-up-outline', label: 'Daromad', onPress: () => router.push('/add-transaction') },
            { icon: 'sparkles-outline', label: 'AI maslahat', onPress: () => {} },
          ].map((a, i) => (
            <TouchableOpacity key={i} onPress={a.onPress} activeOpacity={0.8}
              style={[s.qaBtn, { backgroundColor: a.primary ? C.emerald : C.card }]}>
              <Ionicons name={a.icon as any} size={20} color={a.primary ? C.white : C.emerald} />
              <Text style={[s.qaLbl, { color: a.primary ? C.white : C.text }]}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* AI Insight */}
        <View style={s.pad}>
          <LinearGradient colors={[C.navy, '#1e3a5f']} style={s.aiCard}>
            <View style={s.aiIcon}>
              <Ionicons name="sparkles" size={18} color={C.emerald} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.aiLbl}>AI Tahlil</Text>
              <Text style={s.aiTxt}>Bu oy oziq-ovqatga <Text style={{ color: '#FCA5A5' }}>18% ko'proq</Text> sarfladingiz. Korzinkada haftalik limit o'rnatishingizni tavsiya qilamiz.</Text>
              <TouchableOpacity style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                <Text style={{ color: C.emerald, fontSize: 12, fontWeight: '600' }}>Batafsil</Text>
                <Ionicons name="chevron-forward" size={14} color={C.emerald} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Bar chart */}
        <View style={s.pad}>
          <View style={s.card}>
            <Text style={s.cardTitle}>Oylik ko'rsatkich</Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginTop: 16 }}>
              {[2.8, 4.2, 3.8, 5.6, 4.9, 6.8, 4.2].map((v, i) => (
                <View key={i} style={{ flex: 1, alignItems: 'center', gap: 4 }}>
                  <View style={{ height: (v / 6.8) * 80, backgroundColor: i === 5 ? C.emerald : C.emeraldMuted, borderRadius: 6, width: '100%' }} />
                  <Text style={{ fontSize: 9, color: C.textMuted }}>{['Apr','May','Iyn','Iyl','Avg','Sen','Okt'][i]}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Recent transactions */}
        <View style={s.pad}>
          <View style={s.rowBetween}>
            <Text style={s.cardTitle}>So'nggi tranzaksiyalar</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <Text style={{ color: C.emerald, fontSize: 12, fontWeight: '600' }}>Barchasi</Text>
              <Ionicons name="chevron-forward" size={14} color={C.emerald} />
            </TouchableOpacity>
          </View>
          <View style={{ gap: 8, marginTop: 12 }}>
            {recent.map((tx) => (
              <View key={tx.id} style={s.txRow}>
                <View style={[s.txIcon, { backgroundColor: tx.color + '20' }]}>
                  <Text style={{ fontSize: 20 }}>{tx.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.txName} numberOfLines={1}>{tx.merchant}</Text>
                  <Text style={s.txCat}>{tx.category}</Text>
                </View>
                <Text style={[s.txAmt, { color: tx.amount > 0 ? C.emerald : C.text }]}>
                  {tx.amount > 0 ? '+' : '-'}{fmt(tx.amount)} UZS
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 32 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 2 },
  userName: { fontSize: 16, fontWeight: '600', color: C.white },
  iconBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  notifDot: { position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: C.red },
  avatar: { width: 40, height: 40, borderRadius: 14, backgroundColor: C.emerald, alignItems: 'center', justifyContent: 'center' },
  avatarTxt: { color: C.white, fontWeight: '800', fontSize: 14 },
  balLabel: { fontSize: 12, color: 'rgba(255,255,255,0.5)' },
  balAmt: { fontSize: 36, fontWeight: '800', color: C.white, letterSpacing: -1 },
  balCur: { fontSize: 16, fontWeight: '500', color: 'rgba(255,255,255,0.6)' },
  statChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(0,178,111,0.2)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12 },
  statTxt: { fontSize: 11, fontWeight: '600' },
  smsBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 16, backgroundColor: 'rgba(255,255,255,0.08)', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  smsTxt: { fontSize: 11, color: 'rgba(255,255,255,0.5)' },
  qaRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginTop: -16, marginBottom: 16 },
  qaBtn: { flex: 1, alignItems: 'center', paddingVertical: 14, borderRadius: 20, gap: 6, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  qaLbl: { fontSize: 10, fontWeight: '600' },
  pad: { paddingHorizontal: 20, marginBottom: 16 },
  aiCard: { borderRadius: 20, padding: 16, flexDirection: 'row', gap: 12 },
  aiIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(0,178,111,0.2)', alignItems: 'center', justifyContent: 'center' },
  aiLbl: { fontSize: 11, fontWeight: '700', color: C.emerald, marginBottom: 4 },
  aiTxt: { fontSize: 13, color: C.white, fontWeight: '500', lineHeight: 19 },
  card: { backgroundColor: C.card, borderRadius: 20, padding: 16, borderWidth: 1, borderColor: C.border },
  cardTitle: { fontSize: 14, fontWeight: '600', color: C.navy },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  txRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.card, borderRadius: 18, padding: 12, borderWidth: 1, borderColor: C.border },
  txIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  txName: { fontSize: 13, fontWeight: '600', color: C.navy },
  txCat: { fontSize: 11, color: C.textMuted, marginTop: 2 },
  txAmt: { fontSize: 13, fontWeight: '700' },
});
