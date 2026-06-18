import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SectionList, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../constants/Colors';
import { transactions } from '../../constants/Data';

const CATS = ['Barchasi', 'Oziq-ovqat', 'Transport', 'Daromad', 'Obuna', 'Kommunal', 'Xarid', 'Restoran'];

function fmt(n: number) {
  const a = Math.abs(n);
  if (a >= 1000000) return `${(a / 1000000).toFixed(2)}M`;
  return a.toLocaleString();
}

export default function TransactionsScreen() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('Barchasi');
  const [filterOn, setFilterOn] = useState(false);

  const filtered = useMemo(() => transactions.filter(tx => {
    const q = tx.merchant.toLowerCase().includes(search.toLowerCase()) || tx.category.toLowerCase().includes(search.toLowerCase());
    const c = cat === 'Barchasi' || tx.category === cat;
    return q && c;
  }), [search, cat]);

  const grouped = useMemo(() => {
    const map: Record<string, typeof transactions> = {};
    filtered.forEach(tx => { if (!map[tx.date]) map[tx.date] = []; map[tx.date].push(tx); });
    return Object.entries(map).map(([title, data]) => ({ title, data }));
  }, [filtered]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['top']}>
      <View style={s.header}>
        <Text style={s.title}>Tranzaksiyalar</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={s.searchBox}>
            <Ionicons name="search-outline" size={16} color={C.textMuted} />
            <TextInput style={s.searchInput} placeholder="Qidirish..." placeholderTextColor={C.textMuted} value={search} onChangeText={setSearch} />
          </View>
          <TouchableOpacity onPress={() => setFilterOn(!filterOn)}
            style={[s.filterBtn, { backgroundColor: filterOn ? C.emerald : C.inputBg }]}>
            <Ionicons name="filter-outline" size={16} color={filterOn ? C.white : C.textMuted} />
          </TouchableOpacity>
        </View>
        <FlatList horizontal showsHorizontalScrollIndicator={false} data={CATS} keyExtractor={i => i} style={{ marginTop: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setCat(item)}
              style={[s.catPill, { backgroundColor: cat === item ? C.emerald : C.muted }]}>
              <Text style={[s.catTxt, { color: cat === item ? C.white : C.textMuted }]}>{item}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          contentContainerStyle={{ paddingRight: 8 }}
        />
      </View>

      <SectionList
        sections={grouped}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, paddingTop: 12 }}
        renderSectionHeader={({ section }) => {
          const sum = section.data.reduce((a, t) => a + t.amount, 0);
          return (
            <View style={s.dateRow}>
              <Text style={s.dateTxt}>{section.title}</Text>
              <Text style={[s.dateSum, { color: sum > 0 ? C.emerald : C.red }]}>
                {sum > 0 ? '+' : '-'}{fmt(Math.abs(sum))} UZS
              </Text>
            </View>
          );
        }}
        renderItem={({ item: tx }) => (
          <View style={s.txRow}>
            <View style={[s.txIcon, { backgroundColor: tx.color + '20' }]}>
              <Text style={{ fontSize: 20 }}>{tx.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={s.txName} numberOfLines={1}>{tx.merchant}</Text>
                {tx.source === 'sms' && <View style={s.smsBadge}><Ionicons name="wifi" size={9} color={C.emerald} /></View>}
              </View>
              <Text style={s.txCat}>{tx.category}</Text>
            </View>
            <Text style={[s.txAmt, { color: tx.amount > 0 ? C.emerald : C.text }]}>
              {tx.amount > 0 ? '+' : '-'}{fmt(tx.amount)} UZS
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingTop: 60, gap: 12 }}>
            <Text style={{ fontSize: 40 }}>🔍</Text>
            <Text style={{ color: C.textMuted, fontSize: 14, fontWeight: '500' }}>Tranzaksiya topilmadi</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header: { backgroundColor: C.card, borderBottomWidth: 1, borderBottomColor: C.border, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12 },
  title: { fontSize: 20, fontWeight: '700', color: C.navy, marginBottom: 12 },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: C.inputBg, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: C.border },
  searchInput: { flex: 1, fontSize: 14, color: C.text },
  filterBtn: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.border },
  catPill: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  catTxt: { fontSize: 12, fontWeight: '600' },
  dateRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, marginTop: 16 },
  dateTxt: { fontSize: 11, fontWeight: '700', color: C.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  dateSum: { fontSize: 11, fontWeight: '700' },
  txRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.card, borderRadius: 18, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: C.border },
  txIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  txName: { fontSize: 13, fontWeight: '600', color: C.navy },
  txCat: { fontSize: 11, color: C.textMuted, marginTop: 2 },
  txAmt: { fontSize: 13, fontWeight: '700' },
  smsBadge: { backgroundColor: C.emeraldMuted, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 6 },
});
