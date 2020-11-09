import { Publication } from './publication'

export const MOCK_PUBLICATIONS_CSV: string = `id,title,year,reference,authors,keywords,format
2725,Ornithology Report,1971,"In: Burley, M.K. (Ed)  Joint Services Expedition: Elephant Island, 1970-71.  London: Royal Geographical Society. pp F1-F11.","Furse, J.R., Bruce, G.",,Scientific Paper
2726,Birds of the elephant island group,1975,"Ibis, 117: 529-531","Furse, J.R., Bruce, G.",,Scientific Paper
2727,On the taxonomic value of the intestinal convolutions in birds,1889,Proceedings of the Zoological Society London: 303-316,"Gadow, H",,Letter
21,The origins of the biota of the Falkland Islands and South Georgia.,1997,"Quaternary Proceedings, 5, pp. 59-69.","Buckland, P.C., Hammond, P.M.","Falkland islands, South georgia, Coleoptera, Fossil, Holocene, Refugia, Faunal origins, Charcoal",Scientific Paper
26,Mount Pleasant Airport. Falkland Islands: management and planning.,1987,"Proceedings of the Institution of Civil Engineers, Part 1, 82: 59-75","Chammings, M.B.",Engineering,Scientific Paper`

export const MOCK_PUBLICATIONS_CSV_WITH_EMPTY_ROWS: string = `id,title,year,reference,authors,keywords,format
2725,Ornithology Report,1971,"In: Burley, M.K. (Ed)  Joint Services Expedition: Elephant Island, 1970-71.  London: Royal Geographical Society. pp F1-F11.","Furse, J.R., Bruce, G.",,Scientific Paper
2726,Birds of the elephant island group,1975,"Ibis, 117: 529-531","Furse, J.R., Bruce, G.",,Scientific Paper
2727,On the taxonomic value of the intestinal convolutions in birds,1889,Proceedings of the Zoological Society London: 303-316,"Gadow, H",,Letter
21,The origins of the biota of the Falkland Islands and South Georgia.,1997,"Quaternary Proceedings, 5, pp. 59-69.","Buckland, P.C., Hammond, P.M.","Falkland islands, South georgia, Coleoptera, Fossil, Holocene, Refugia, Faunal origins, Charcoal",Scientific Paper
26,Mount Pleasant Airport. Falkland Islands: management and planning.,1987,"Proceedings of the Institution of Civil Engineers, Part 1, 82: 59-75","Chammings, M.B.",Engineering,Scientific Paper
#REF!,#REF!,#REF!,#REF!,#N/A,#REF!,#REF!

`
export const MOCK_PUBLICATIONS: Publication[] = [
    {'id':'2725',
    'title':'Ornithology Report',
    'year':'1971',
    'reference':'In: Burley, M.K. (Ed)  Joint Services Expedition: Elephant Island, 1970-71.  London: Royal Geographical Society. pp F1-F11.',
    'authors':'Furse, J.R., Bruce, G.',
    'keywords':'',
    'format':'Scientific Paper'},
    {'id':'2726',
    'title':'Birds of the elephant island group',
    'year':'1975',
    'reference':'Ibis, 117: 529-531',
    'authors':'Furse, J.R., Bruce, G.',
    'keywords':'',
    'format':'Scientific Paper'},
    {'id':'2727',
    'title':'On the taxonomic value of the intestinal convolutions in birds',
    'year':'1889',
    'reference':'Proceedings of the Zoological Society London: 303-316',
    'authors':'Gadow, H',
    'keywords':'',
    'format':'Letter'},
    {'id':'21',
    'title':'The origins of the biota of the Falkland Islands and South Georgia.',
    'year':'1997',
    'reference':'Quaternary Proceedings, 5, pp. 59-69.',
    'authors':'Buckland, P.C., Hammond, P.M.',
    'keywords':'Falkland islands, South georgia, Coleoptera, Fossil, Holocene, Refugia, Faunal origins, Charcoal',
    'format':'Scientific Paper'},
    {'id':'26',
    'title':'Mount Pleasant Airport. Falkland Islands: management and planning.',
    'year':'1987',
    'reference':'Proceedings of the Institution of Civil Engineers, Part 1, 82: 59-75',
    'authors':'Chammings, M.B.',
    'keywords':'Engineering',
    'format':'Scientific Paper'}
]
