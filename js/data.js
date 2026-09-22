/* Daten für "Meine Reise durch die deutschsprachigen Länder"
   Alle Texte: Deutsch, Niveau A2. Fakten geprüft (Sept. 2026). */
window.REISE = {
  autor: 'Rares Duca, 18 Jahre',
  tage: 21,
  laender: {
    DE: { name: 'Deutschland', willkommen: 'Willkommen in Deutschland' },
    CH: { name: 'Schweiz', willkommen: 'Willkommen in der Schweiz' },
    AT: { name: 'Österreich', willkommen: 'Willkommen in Österreich' }
  },
  stationen: [
    {
      id: 'koeln', nr: 1, stadt: 'Köln', ort: 'Kölner Dom', land: 'DE', tage: [1, 2],
      lon: 6.957, lat: 50.941,
      geschichte: 'Meine Reise hat in Köln begonnen. Ich bin mit dem Zug angekommen und der Dom war direkt vor dem Bahnhof. Er ist riesig! Ich bin 533 Stufen auf den Turm gestiegen. Das war anstrengend, aber der Blick auf den Rhein war super. Am Abend habe ich am Rhein gesessen und ein Kölsch probiert.',
      highlight: 'Der Blick vom Südturm auf den Rhein und die Hohenzollernbrücke.',
      fakt: 'Der Kölner Dom ist 157 Meter hoch. Man hat ihn von 1248 bis 1880 gebaut – das sind 632 Jahre! Seit 1996 ist er UNESCO-Welterbe.',
      bildtext: 'Der Dom am Rhein'
    },
    {
      id: 'bremen', nr: 2, stadt: 'Bremen', ort: 'Bremer Stadtmusikanten', land: 'DE', tage: [3],
      lon: 8.807, lat: 53.076,
      geschichte: 'Am dritten Tag bin ich nach Bremen gefahren. Auf dem Marktplatz habe ich die Bremer Stadtmusikanten gesehen: den Esel, den Hund, die Katze und den Hahn. Ich habe die Beine vom Esel angefasst, weil das Glück bringt. Danach bin ich durch das Schnoorviertel gelaufen. Die Gassen dort sind sehr schmal und sehr alt.',
      highlight: 'Die Bronze-Figur vor dem Rathaus. Sie ist kleiner als auf den Fotos!',
      fakt: 'Die Figur ist aus Bronze. Der Künstler Gerhard Marcks hat sie gemacht. Seit 1953 steht sie neben dem Rathaus.',
      bildtext: 'Esel, Hund, Katze, Hahn'
    },
    {
      id: 'hamburg', nr: 3, stadt: 'Hamburg', ort: 'Elbphilharmonie', land: 'DE', tage: [4, 5],
      lon: 9.984, lat: 53.541,
      geschichte: 'In Hamburg habe ich zwei Tage verbracht. Ich habe die Elbphilharmonie besucht. Das Gebäude sieht aus wie eine Welle aus Glas. Ich bin mit der langen Rolltreppe auf die Plaza gefahren. Von dort habe ich den ganzen Hafen gesehen. Es hat geregnet, aber das war mir egal, weil die Aussicht so schön war.',
      highlight: 'Die Plaza in 37 Metern Höhe mit Blick auf den Hafen.',
      fakt: 'Die Elbphilharmonie ist 110 Meter hoch. Man hat sie am 11. Januar 2017 eröffnet. Unten ist ein alter Speicher, oben ist Glas.',
      bildtext: 'Die „Elphi“ im Hafen'
    },
    {
      id: 'ruegen', nr: 4, stadt: 'Rügen', ort: 'Seebrücke Sellin', land: 'DE', tage: [6, 7],
      lon: 13.693, lat: 54.378,
      geschichte: 'Dann bin ich an die Ostsee gefahren, auf die Insel Rügen. In Sellin habe ich die Seebrücke gesehen. Sie ist weiß und sehr elegant. Ich bin bis zum Ende gelaufen und habe die Füße ins Wasser gehalten. Das Wasser war kalt! Am zweiten Tag habe ich die Kreidefelsen besucht. Ich habe mich sehr frei gefühlt.',
      highlight: 'Der Sonnenaufgang an der Seebrücke – ich bin extra früh aufgestanden.',
      fakt: 'Die Seebrücke ist 394 Meter lang. Die erste Brücke war von 1906. Die neue Brücke ist seit 1998 offen.',
      bildtext: 'Morgens an der Seebrücke'
    },
    {
      id: 'berlin', nr: 5, stadt: 'Berlin', ort: 'Reichstagskuppel', land: 'DE', tage: [8, 9, 10],
      lon: 13.376, lat: 52.519,
      geschichte: 'Berlin war die größte Stadt auf meiner Reise. Ich habe das Brandenburger Tor gesehen und bin auf die Kuppel vom Reichstag gegangen. Die Kuppel ist aus Glas. Man läuft auf einer Rampe nach oben und sieht die ganze Stadt. Ich habe auch die East Side Gallery besucht. Berlin ist laut, bunt und sehr interessant.',
      highlight: 'Die Reichstagskuppel am Abend, wenn die Lichter der Stadt angehen.',
      fakt: 'Die Kuppel ist 23,5 Meter hoch und etwa 40 Meter breit. Der Architekt war Norman Foster. Seit 1999 kann man sie besuchen.',
      bildtext: 'In der Glaskuppel'
    },
    {
      id: 'bastei', nr: 6, stadt: 'Sächsische Schweiz', ort: 'Basteibrücke', land: 'DE', tage: [11],
      lon: 14.073, lat: 50.962,
      geschichte: 'Nach Berlin habe ich Natur gebraucht. Ich bin in die Sächsische Schweiz gefahren. Dort habe ich die Basteibrücke gesehen. Sie steht hoch über der Elbe zwischen großen Felsen. Ich bin früh morgens gewandert, weil es dann noch ruhig war. Der Nebel im Tal war wunderschön. Das war mein Lieblingstag in der Natur.',
      highlight: 'Der Blick von der Bastei auf die Elbe im Morgennebel.',
      fakt: 'Die Basteibrücke ist aus Sandstein. Man hat sie 1851 gebaut. Sie ist 76,5 Meter lang und hat sieben Bögen.',
      bildtext: 'Die Brücke zwischen den Felsen'
    },
    {
      id: 'erfurt', nr: 7, stadt: 'Erfurt', ort: 'Krämerbrücke', land: 'DE', tage: [12],
      lon: 11.030, lat: 50.979,
      geschichte: 'Erfurt ist eine kleine Stadt mit viel Geschichte. Ich habe die Krämerbrücke besucht. Das ist eine Brücke mit Häusern darauf! Man merkt gar nicht, dass man auf einer Brücke ist. In den kleinen Läden gibt es Schokolade und Kunst. Ich habe ein Geschenk für meine Familie gekauft und dann einen Kaffee getrunken.',
      highlight: 'Die kleinen Läden und Werkstätten auf der Brücke.',
      fakt: 'Auf der Krämerbrücke stehen 32 Häuser. Die Brücke ist etwa 120 Meter lang. Die Steinbrücke ist aus dem Jahr 1325.',
      bildtext: 'Häuser auf der Brücke'
    },
    {
      id: 'frankfurt', nr: 8, stadt: 'Frankfurt am Main', ort: 'Skyline', land: 'DE', tage: [13],
      lon: 8.682, lat: 50.110,
      geschichte: 'Frankfurt war ganz anders. Hier gibt es viele Hochhäuser, deshalb nennt man die Stadt auch „Mainhattan“. Ich bin auf den Main Tower gefahren. Von oben sieht die Stadt aus wie eine Spielzeugstadt. Am Abend habe ich am Main gesessen. Die Skyline mit den Lichtern war sehr schön. Ich habe Apfelwein probiert.',
      highlight: 'Die Skyline bei Nacht vom Main-Ufer.',
      fakt: 'Der Commerzbank Tower ist 259 Meter hoch. Er ist das höchste Gebäude in Deutschland. Der Main Tower ist 200 Meter hoch und hat eine Aussichtsplattform.',
      bildtext: 'Mainhattan bei Nacht',
      bildPos: 'center 20%'
    },
    {
      id: 'tuebingen', nr: 9, stadt: 'Tübingen', ort: 'Stocherkahnfahrt auf dem Neckar', land: 'DE', tage: [14],
      lon: 9.056, lat: 48.520,
      geschichte: 'In Tübingen habe ich eine Stocherkahnfahrt auf dem Neckar gemacht. Ein Stocherkahn ist ein langes, flaches Boot. Ein Student hat es mit einer langen Stange bewegt. Ich habe es auch probiert – das war schwer! Vom Wasser aus habe ich die bunten Häuser und den Hölderlinturm gesehen. Es war sehr ruhig und schön.',
      highlight: 'Ich habe selbst gestochert. Ich bin fast ins Wasser gefallen!',
      fakt: 'Die Universität Tübingen ist von 1477. Seit 1956 gibt es jedes Jahr ein großes Stocherkahnrennen auf dem Neckar.',
      bildtext: 'Mit dem Stocherkahn'
    },
    {
      id: 'rheinfall', nr: 10, stadt: 'Schaffhausen', ort: 'Rheinfall', land: 'CH', tage: [15],
      lon: 8.615, lat: 47.678,
      geschichte: 'Am Tag 15 bin ich in die Schweiz gefahren. Mein erstes Ziel war der Rheinfall bei Schaffhausen. Ich habe das Wasser schon von weitem gehört. Es ist der größte Wasserfall in Europa. Ich bin mit einem Boot bis zum Felsen in der Mitte gefahren. Ich war ganz nass, aber sehr glücklich.',
      highlight: 'Die Bootsfahrt bis zum großen Felsen mitten im Wasserfall.',
      fakt: 'Der Rheinfall ist 23 Meter hoch und 150 Meter breit. Im Sommer fließen dort bis zu 600 Kubikmeter Wasser pro Sekunde.',
      bildtext: 'Nass, aber glücklich'
    },
    {
      id: 'bern', nr: 11, stadt: 'Bern', ort: 'Altstadt mit dem Zytglogge', land: 'CH', tage: [16, 17],
      lon: 7.448, lat: 46.948,
      geschichte: 'Bern ist die Hauptstadt der Schweiz. Die Altstadt ist sehr alt und schön. Ich bin unter den Lauben spaziert – das sind lange Arkaden. Um zwölf Uhr habe ich vor dem Zytglogge gewartet. Das ist ein Uhrturm mit kleinen Figuren. Ich habe mit einer Verkäuferin Deutsch gesprochen. Schweizerdeutsch war für mich schwer, aber sie war sehr nett.',
      highlight: 'Die Figuren am Zytglogge, wenn die Uhr schlägt.',
      fakt: 'Man hat den Zytglogge um 1220 gebaut. Die Uhr ist von 1530. Die Altstadt von Bern ist seit 1983 UNESCO-Welterbe.',
      bildtext: 'Der Zytglogge um zwölf'
    },
    {
      id: 'muenchen', nr: 12, stadt: 'München', ort: 'Lenbachhaus & Marienplatz', land: 'DE', tage: [18, 19],
      lon: 11.576, lat: 48.137,
      geschichte: 'Von Bern bin ich zurück nach Deutschland gefahren, nach München. Ich habe das Lenbachhaus besucht, weil ich die Bilder vom „Blauen Reiter“ sehen wollte. Die Farben von Franz Marc und Kandinsky sind fantastisch! Auf dem Marienplatz habe ich das Glockenspiel im Rathaus gesehen. Danach habe ich im Englischen Garten eine Brezel gegessen.',
      highlight: 'Die blauen Pferde von Franz Marc im Lenbachhaus.',
      fakt: 'Die Künstlergruppe „Der Blaue Reiter“ ist 1911 in München entstanden. Gabriele Münter hat dem Lenbachhaus 1957 über 1000 Werke geschenkt.',
      bildtext: 'Marienplatz und Rathaus',
      willkommen: 'Willkommen zurück in Deutschland'
    },
    {
      id: 'grossglockner', nr: 13, stadt: 'Großglockner', ort: 'Hochalpenstraße', land: 'AT', tage: [20],
      lon: 12.832, lat: 47.083,
      geschichte: 'Jetzt war ich in Österreich! Ich bin mit dem Bus über die Großglockner Hochalpenstraße gefahren. Die Straße hat viele Kurven und geht sehr hoch in die Berge. Oben hat es Schnee gegeben – im Sommer! Ich habe den Großglockner gesehen, den höchsten Berg von Österreich. Ich habe auch Murmeltiere gehört. Das war ein großes Abenteuer.',
      highlight: 'Der erste Blick auf den Großglockner und den Gletscher.',
      fakt: 'Die Straße ist 48 Kilometer lang und hat 36 Kehren. Der höchste Punkt ist die Edelweißspitze mit 2571 Metern. Der Großglockner ist 3798 Meter hoch.',
      bildtext: 'Kurve für Kurve nach oben'
    },
    {
      id: 'graz', nr: 14, stadt: 'Graz', ort: 'Kunsthaus & Schlossberg', land: 'AT', tage: [21],
      lon: 15.439, lat: 47.071,
      geschichte: 'Meine letzte Station war Graz. Das Kunsthaus sieht aus wie ein blaues Raumschiff. Die Leute in Graz nennen es „Friendly Alien“. Ich bin auf den Schlossberg gestiegen und habe den Uhrturm gesehen. Von oben sieht man die roten Dächer der Altstadt. Ich war müde, aber sehr stolz, dass ich die ganze Reise geschafft habe.',
      highlight: 'Der Sonnenuntergang vom Schlossberg über den roten Dächern.',
      fakt: 'Das Kunsthaus Graz ist von 2003. Die Architekten waren Peter Cook und Colin Fournier. Die Altstadt von Graz ist seit 1999 UNESCO-Welterbe.',
      bildtext: 'Das „Friendly Alien“'
    }
  ],
  warum: [
    'Ich habe diese Reise gemacht, weil ich Deutsch im echten Leben sprechen wollte. Nicht nur im Klassenzimmer, sondern auf der Straße, im Zug und im Café.',
    'Ich habe 21 Tage geplant: 10 Stationen in Deutschland, 2 in der Schweiz und 2 in Österreich. Meine Regel war einfach: Ich spreche nur Deutsch!'
  ],
  fazit: [
    'Am besten hat mir die Natur gefallen: die Basteibrücke, der Rheinfall und die Berge in Österreich. Aber auch die Menschen waren toll.',
    'Ich habe gelernt, dass man keine Angst vor Fehlern haben muss. Die Leute haben mich verstanden, wenn ich langsam gesprochen habe.',
    'Mein Deutsch ist jetzt besser. Und ich möchte wieder zurück!'
  ]
};
