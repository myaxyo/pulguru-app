import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { C } from '../../constants/Colors';
import { budgets } from '../../constants/Data';

function fmt(v: number) {
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
  return `${(v / 1000).toFixed(0)}K`;
}

export default function BudgetsScreen() {
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newLimit, setNewLimit] = useState('');
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);
  const totalLimit = budgets.reduce((s, b) => s + b.limit, 0);
  const safeToday = Math.max(0, (totalLimit - totalSpent) / 10);
  const overBudget = budgets.filter(b => b.spent > b.limit);
  const nearLimit = budgets.filter(b => b.spent / b.limit >= 0.8 && b.spent <= b.limit);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['top']}>
      <View style={s.header}>
        <Text style={s.title}>Byudjetlar</Text>
        <TouchableOpacity onPress={() => setShowAdd(true)} style={s.addBtn}>
          <Ionicons name="add" size={22} color={C.white} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}>
        <LinearGradient colors={[C.emerald, C.emeraldDark]} style={s.safeCard}>
          <Text style={s.safeLabel}>Bugun xavfsiz sarflash mumkin</Text>
          <Text style={s.safeAmt}>{fmt(safeToday)} <Text style={{ fontSize: 16, opacity: 0.8 }}>UZS</Text></Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 }}>
            <View style={s.progBg}><View style={[s.progFill, { width: `${Math.min((totalSpent / totalLimit) * 100, 100)}%` as any }]} /></View>
            <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: '600' }}>{fmt(totalSpent)} / {fmt(totalLimit)}</Text>
          </View>
        </LinearGradient>

        {(overBudget.length > 0 || nearLimit.length > 0) && (
          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
            {overBudget.length > 0 && (
              <View style={[s.alertChip, { backgroundColor: C.redLight, borderColor: 'rgba(239,68,68,0.2)' }]}>
                <Ionicons name="warning-outline" size={14} color={C.red} />
                <Text style={{ fontSize: 12, fontWeight: '600', color: C.red }}>{overBudget.length} ta oshib ketdi</Text>
              </View>
            )}
            {nearLimit.length > 0 && (
              <View style={[s.alertChip, { backgroundColor: C.goldLight, borderColor: 'rgba(245,158,11,0.2)' }]}>
                <Ionicons name="warning-outline" size={14} color={C.gold} />
                <Text style={{ fontSize: 12, fontWeight: '600', color: C.gold }}>{nearLimit.length} ta yaqinlashdi</Text>
              </View>
            )}
          </View>
        )}

        <Text style={s.secTitle}>Kategoriyalar</Text>
        {budgets.map(b => {
          const pct = Math.min((b.spent / b.limit) * 100, 100);
          const isOver = b.spent > b.limit;
          const isNear = !isOver && pct >= 80;
          const barColor = isOver ? C.red : isNear ? C.gold : b.color;
          return (
            <View key={b.id} style={[s.budCard, { borderColor: isOver ? 'rgba(239,68,68,0.3)' : isNear ? 'rgba(245,158,11,0.3)' : C.border }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <View style={[s.iconBox, { backgroundColor: b.color + '20' }]}><Text style={{ fontSize: 22 }}>{b.icon}</Text></View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={s.budName}>{b.name}</Text>
                    {isOver
                      ? <View style={{ backgroundColor: C.redLight, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 }}><Text style={{ fontSize: 10, color: C.red, fontWeight: '700' }}>-{fmt(b.spent - b.limit)} oshdi</Text></View>
                      : <Text style={{ fontSize: 11, color: C.textMuted }}>{fmt(b.limit - b.spent)} qoldi</Text>}
                  </View>
                  <Text style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{fmt(b.spent)} / {fmt(b.limit)} UZS</Text>
                </View>
              </View>
              <View style={s.progBg2}><View style={[s.progFill2, { width: `${pct}%` as any, backgroundColor: barColor }]} /></View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Ionicons name={isOver ? 'warning-outline' : 'checkmark-circle'} size={12} color={isOver ? C.red : C.emerald} />
                  <Text style={{ fontSize: 11, color: isOver ? C.red : C.textMuted, fontWeight: '600' }}>{Math.round(pct)}%</Text>
                </View>
                <Text style={{ fontSize: 11, color: C.textMuted }}>{fmt(b.limit)} limit</Text>
              </View>
            </View>
          );
        })}

        <TouchableOpacity onPress={() => router.push('/savings')} activeOpacity={0.85}>
          <LinearGradient colors={[C.gold, C.goldDark]} style={s.savShortcut}>
            <View>
              <Text style={{ color: C.white, fontWeight: '700', fontSize: 14 }}>Tejamkorlik maqsadlari</Text>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 2 }}>4 ta aktiv maqsad • 32.1M UZS tejalgan</Text>
            </View>
            <Text style={{ fontSize: 28 }}>🏆</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showAdd} transparent animationType="slide" onRequestClose={() => setShowAdd(false)}>
        <TouchableOpacity style={s.overlay} activeOpacity={1} onPress={() => setShowAdd(false)}>
          <TouchableOpacity activeOpacity={1} style={s.sheet}>
            <View style={s.sheetHandle} />
            <Text style={s.sheetTitle}>Yangi byudjet</Text>
            <Text style={s.inputLbl}>KATEGORIYA NOMI</Text>
            <TextInput style={s.input} placeholder="Masalan: Sport" placeholderTextColor={C.textMuted} value={newName} onChangeText={setNewName} />
            <Text style={[s.inputLbl, { marginTop: 16 }]}>OYLIK LIMIT (UZS)</Text>
            <TextInput style={s.input} placeholder="500 000" placeholderTextColor={C.textMuted} keyboardType="numeric" value={newLimit} onChangeText={setNewLimit} />
            <TouchableOpacity onPress={() => { setShowAdd(false); setNewName(''); setNewLimit(''); }} activeOpacity={0.85} style={{ marginTop: 20 }}>
              <LinearGradient colors={[C.emerald, C.emeraldDark]} style={s.sheetBtn}>
                <Text style={{ color: C.white, fontWeight: '700', fontSize: 16 }}>Byudjet yaratish</Text>
              </LinearGradient>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header: { backgroundColor: C.card, borderBottomWidth: 1, borderBottomColor: C.border, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700', color: C.navy },
  addBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: C.emerald, alignItems: 'center', justifyContent: 'center' },
  safeCard: { borderRadius: 20, padding: 20, marginTop: 16, marginBottom: 16 },
  safeLabel: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  safeAmt: { fontSize: 32, fontWeight: '800', color: C.white },
  progBg: { flex: 1, height: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' },
  progFill: { height: '100%', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 3 },
  alertChip: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 14, borderWidth: 1, marginBottom: 16 },
  secTitle: { fontSize: 14, fontWeight: '600', color: C.navy, marginBottom: 12 },
  budCard: { backgroundColor: C.card, borderRadius: 20, padding: 16, marginBottom: 12, borderWidth: 1 },
  iconBox: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  budName: { fontSize: 14, fontWeight: '600', color: C.navy },
  progBg2: { height: 10, backgroundColor: C.muted, borderRadius: 5, overflow: 'hidden' },
  progFill2: { height: '100%', borderRadius: 5 },
  savShortcut: { borderRadius: 20, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, marginBottom: 16 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: C.card, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 40 },
  sheetHandle: { width: 40, height: 4, backgroundColor: C.border, borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  sheetTitle: { fontSize: 18, fontWeight: '700', color: C.navy, marginBottom: 20 },
  inputLbl: { fontSize: 11, fontWeight: '700', color: C.textMuted, letterSpacing: 0.5, marginBottom: 8 },
  input: { backgroundColor: C.inputBg, borderWidth: 1, borderColor: C.border, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: C.text },
  sheetBtn: { borderRadius: 18, paddingVertical: 16, alignItems: 'center' },
});
