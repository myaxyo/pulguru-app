import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { C } from '../../constants/Colors';

type IName = React.ComponentProps<typeof Ionicons>['name'];

function Row({ icon, iconBg, label, right, onPress, last }: { icon: IName; iconBg: string; label: string; right?: React.ReactNode; onPress?: () => void; last?: boolean }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={onPress ? 0.7 : 1}
      style={[s.row, { borderBottomWidth: last ? 0 : 1 }]}>
      <View style={[s.rowIcon, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={16} color={C.white} />
      </View>
      <Text style={s.rowLbl}>{label}</Text>
      {right ?? <Ionicons name="chevron-forward" size={16} color={C.textMuted} />}
    </TouchableOpacity>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={s.secTitle}>{title}</Text>
      <View style={s.secCard}>{children}</View>
    </View>
  );
}

export default function ProfileScreen() {
  const [lang, setLang] = useState('uz');
  const [dark, setDark] = useState(false);
  const [sms, setSms] = useState(true);
  const [notif, setNotif] = useState(true);
  const [lock, setLock] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['top']}>
      <View style={s.header}><Text style={s.title}>Profil</Text></View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}>

        <View style={s.userCard}>
          <LinearGradient colors={[C.emerald, C.emeraldDark]} style={s.avatar}>
            <Text style={s.avatarTxt}>AG</Text>
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={s.userName}>Alisher G'aniyev</Text>
            <Text style={s.userEmail}>alisher@gmail.com</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
              <View style={[s.chip, { backgroundColor: C.goldLight }]}>
                <Ionicons name="star" size={11} color={C.gold} />
                <Text style={[s.chipTxt, { color: C.gold }]}>Premium emas</Text>
              </View>
              <View style={[s.chip, { backgroundColor: C.emeraldMuted }]}>
                <Text style={[s.chipTxt, { color: C.emerald }]}>47 kun faol</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[s.smsCard, { backgroundColor: sms ? C.emeraldMuted : C.muted, borderColor: sms ? C.emerald : C.border }]}>
          <View style={[s.rowIcon, { backgroundColor: sms ? C.emerald : C.textMuted }]}>
            <Ionicons name="chatbubble-outline" size={18} color={C.white} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: C.navy }}>SMS integratsiyasi</Text>
            <Text style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{sms ? '● Faol — 47 tranzaksiya aniqlandi' : "● O'chirilgan"}</Text>
          </View>
          <Switch value={sms} onValueChange={setSms} trackColor={{ false: C.switchBg, true: C.emerald }} thumbColor={C.white} />
        </View>

        <Section title="Til">
          {[{ code: 'uz', label: "O'zbekcha", flag: '🇺🇿' }, { code: 'ru', label: 'Русский', flag: '🇷🇺' }, { code: 'en', label: 'English', flag: '🇬🇧' }].map((l, i, arr) => (
            <TouchableOpacity key={l.code} onPress={() => setLang(l.code)} activeOpacity={0.7}
              style={[s.row, { borderBottomWidth: i < arr.length - 1 ? 1 : 0 }]}>
              <Text style={{ fontSize: 22 }}>{l.flag}</Text>
              <Text style={[s.rowLbl, { marginLeft: 4 }]}>{l.label}</Text>
              {lang === l.code && <Ionicons name="checkmark-circle" size={20} color={C.emerald} />}
            </TouchableOpacity>
          ))}
        </Section>

        <Section title="Ko'rinish">
          <Row icon={dark ? 'moon' : 'sunny'} iconBg={dark ? '#334155' : C.gold} label={dark ? "Qorong'u rejim" : "Yorug' rejim"}
            right={<Switch value={dark} onValueChange={setDark} trackColor={{ false: C.switchBg, true: C.emerald }} thumbColor={C.white} />} last />
        </Section>

        <Section title="Xavfsizlik">
          <Row icon="notifications-outline" iconBg={C.blue} label="Bildirishnomalar"
            right={<Switch value={notif} onValueChange={setNotif} trackColor={{ false: C.switchBg, true: C.emerald }} thumbColor={C.white} />} />
          <Row icon="lock-closed-outline" iconBg={C.purple} label="Ilovani qulflash"
            right={<Switch value={lock} onValueChange={setLock} trackColor={{ false: C.switchBg, true: C.emerald }} thumbColor={C.white} />} />
          <Row icon="shield-checkmark-outline" iconBg={C.teal} label="Maxfiylik siyosati" last />
        </Section>

        <Section title="Ma'lumotlar">
          <Row icon="download-outline" iconBg={C.blue} label="CSV formatda eksport" />
          <Row icon="document-outline" iconBg={C.indigo} label="PDF hisobot" />
          <Row icon="wifi-outline" iconBg={C.emerald} label="Obunalar boshqaruvi" onPress={() => router.push('/subscriptions')} last />
        </Section>

        <Section title="Ilova haqida">
          <View style={[s.row, { borderBottomWidth: 1 }]}>
            <Ionicons name="information-circle-outline" size={20} color={C.textMuted} />
            <Text style={[s.rowLbl, { marginLeft: 4 }]}>Versiya</Text>
            <Text style={{ fontSize: 13, color: C.textMuted }}>1.0.0 (MVP)</Text>
          </View>
          <View style={[s.row, { borderBottomWidth: 0 }]}>
            <Ionicons name="star-outline" size={20} color={C.gold} />
            <Text style={[s.rowLbl, { marginLeft: 4 }]}>Baho bering</Text>
            <View style={{ flexDirection: 'row', gap: 2 }}>
              {[1,2,3,4,5].map(i => <Ionicons key={i} name="star" size={14} color={C.gold} />)}
            </View>
          </View>
        </Section>

        <TouchableOpacity activeOpacity={0.85} style={s.logoutBtn}>
          <Ionicons name="log-out-outline" size={18} color={C.red} />
          <Text style={s.logoutTxt}>Chiqish</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', fontSize: 12, color: C.textMuted, marginTop: 16 }}>PulGuru v1.0 • Made with ❤️ in Uzbekistan</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header: { backgroundColor: C.card, borderBottomWidth: 1, borderBottomColor: C.border, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 14 },
  title: { fontSize: 20, fontWeight: '700', color: C.navy },
  userCard: { backgroundColor: C.card, borderRadius: 20, padding: 16, marginTop: 16, flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16, borderWidth: 1, borderColor: C.border },
  avatar: { width: 64, height: 64, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  avatarTxt: { color: C.white, fontWeight: '800', fontSize: 22 },
  userName: { fontSize: 16, fontWeight: '700', color: C.navy },
  userEmail: { fontSize: 12, color: C.textMuted, marginTop: 2 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  chipTxt: { fontSize: 11, fontWeight: '600' },
  smsCard: { borderRadius: 18, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20, borderWidth: 1.5 },
  secTitle: { fontSize: 11, fontWeight: '700', color: C.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, paddingHorizontal: 4 },
  secCard: { backgroundColor: C.card, borderRadius: 18, overflow: 'hidden', borderWidth: 1, borderColor: C.border },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 14, borderBottomColor: C.border },
  rowIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  rowLbl: { flex: 1, fontSize: 14, fontWeight: '500', color: C.text },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 18, backgroundColor: C.redLight, borderWidth: 1, borderColor: 'rgba(239,68,68,0.2)' },
  logoutTxt: { fontSize: 15, fontWeight: '600', color: C.red },
});
