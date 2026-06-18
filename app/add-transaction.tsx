import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { C } from '../constants/Colors';

const CATS = [
  { name: 'Oziq-ovqat', icon: '🛒', color: C.emerald },
  { name: 'Transport', icon: '🚕', color: C.blue },
  { name: 'Restoran', icon: '🍔', color: C.orange },
  { name: 'Xarid', icon: '📦', color: C.pink },
  { name: "Ko'ngilochar", icon: '🎮', color: C.purple },
  { name: "Sog'liq", icon: '💊', color: C.teal },
  { name: 'Aloqa', icon: '📱', color: C.indigo },
  { name: 'Kommunal', icon: '💡', color: C.red },
  { name: 'Daromad', icon: '💼', color: C.gold },
  { name: 'Boshqa', icon: '💰', color: C.textMuted },
];

export default function AddTransactionScreen() {
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [cat, setCat] = useState(CATS[0]);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);
  const [showCats, setShowCats] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => router.back(), 1200); };
  const fmtAmt = (v: string) => { const n = parseInt(v.replace(/\D/g, ''), 10); return isNaN(n) ? '' : n.toLocaleString('uz-UZ'); };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['top']}>
      <View style={s.header}>
        <Text style={s.title}>Tranzaksiya qo'shish</Text>
        <TouchableOpacity onPress={() => router.back()} style={s.closeBtn}>
          <Ionicons name="close" size={20} color={C.textMuted} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}>
        <View style={s.typeToggle}>
          {(['expense', 'income'] as const).map(t => (
            <TouchableOpacity key={t} onPress={() => setType(t)} activeOpacity={0.85}
              style={[s.typeBtn, { backgroundColor: type === t ? (t === 'expense' ? C.red : C.emerald) : 'transparent' }]}>
              <Text style={[s.typeTxt, { color: type === t ? C.white : C.textMuted }]}>{t === 'expense' ? '💸 Xarajat' : '💰 Daromad'}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 4 }}>
          <Text style={[s.amtSign, { color: type === 'expense' ? C.red : C.emerald }]}>{type === 'expense' ? '−' : '+'}</Text>
          <TextInput
            style={[s.amtInput, { color: type === 'expense' ? C.red : C.emerald }]}
            placeholder="0" placeholderTextColor={type === 'expense' ? C.red + '50' : C.emerald + '50'}
            keyboardType="numeric" value={fmtAmt(amount)} onChangeText={v => setAmount(v.replace(/\D/g, ''))}
          />
        </View>
        <View style={[s.amtLine, { backgroundColor: type === 'expense' ? C.red : C.emerald }]} />
        <Text style={s.amtCur}>UZS</Text>

        <Text style={s.lbl}>KATEGORIYA</Text>
        <TouchableOpacity onPress={() => setShowCats(!showCats)} activeOpacity={0.85} style={s.catSelect}>
          <Text style={{ fontSize: 22 }}>{cat.icon}</Text>
          <Text style={s.catSelectTxt}>{cat.name}</Text>
          <Ionicons name={showCats ? 'chevron-up' : 'chevron-down'} size={16} color={C.textMuted} />
        </TouchableOpacity>

        {showCats && (
          <View style={s.catGrid}>
            {CATS.map(c => (
              <TouchableOpacity key={c.name} onPress={() => { setCat(c); setShowCats(false); }} activeOpacity={0.85}
                style={[s.catGridItem, { borderColor: cat.name === c.name ? c.color : C.border, backgroundColor: cat.name === c.name ? c.color + '15' : C.card }]}>
                <Text style={{ fontSize: 24 }}>{c.icon}</Text>
                <Text style={{ fontSize: 10, color: C.navy, fontWeight: '600', textAlign: 'center' }}>{c.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={s.lbl}>IZOH</Text>
        <TextInput style={s.noteInput} placeholder="Masalan: Korzinkada xarid" placeholderTextColor={C.textMuted} value={note} onChangeText={setNote} />

        <TouchableOpacity onPress={handleSave} disabled={!amount} activeOpacity={0.85} style={{ marginTop: 24 }}>
          <LinearGradient colors={[C.emerald, C.emeraldDark]} style={[s.saveBtn, { opacity: !amount ? 0.4 : 1 }]}>
            <Ionicons name={saved ? 'checkmark-circle' : 'save-outline'} size={20} color={C.white} />
            <Text style={s.saveTxt}>{saved ? 'Saqlandi ✓' : 'Saqlash'}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header: { backgroundColor: C.card, borderBottomWidth: 1, borderBottomColor: C.border, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: '700', color: C.navy },
  closeBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: C.muted, alignItems: 'center', justifyContent: 'center' },
  typeToggle: { flexDirection: 'row', backgroundColor: C.muted, borderRadius: 18, padding: 4, marginTop: 24, marginBottom: 32 },
  typeBtn: { flex: 1, paddingVertical: 12, borderRadius: 14, alignItems: 'center' },
  typeTxt: { fontSize: 14, fontWeight: '700' },
  amtSign: { fontSize: 32, fontWeight: '300' },
  amtInput: { fontSize: 48, fontWeight: '800', textAlign: 'center', minWidth: 120 },
  amtLine: { height: 2, borderRadius: 1, marginHorizontal: 40, marginTop: 8, opacity: 0.3 },
  amtCur: { textAlign: 'center', fontSize: 14, color: C.textMuted, marginTop: 4, marginBottom: 28 },
  lbl: { fontSize: 11, fontWeight: '700', color: C.textMuted, letterSpacing: 0.5, marginBottom: 8 },
  catSelect: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.card, borderWidth: 2, borderColor: C.border, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 12 },
  catSelectTxt: { flex: 1, fontSize: 15, fontWeight: '600', color: C.navy },
  catGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  catGridItem: { width: '30%', alignItems: 'center', gap: 6, padding: 12, borderRadius: 16, borderWidth: 2 },
  noteInput: { backgroundColor: C.card, borderWidth: 1, borderColor: C.border, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: C.text, marginBottom: 8 },
  saveBtn: { borderRadius: 18, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  saveTxt: { color: C.white, fontWeight: '700', fontSize: 16 },
});
