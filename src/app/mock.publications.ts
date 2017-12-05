import { Publication } from './publication';

export const MOCK_PUBLICATIONS: Publication[] = [
    {
    'id': '1',
    'title': 'Ornithology Report',
    'authors': 'Furse, J.R., Bruce, G.',
    'year': '1971',
    'keywords':'',
    'reference': 'Journal of Tom',
    'format': ''},
    {
    'id': '2',
    'title': 'Birds of the elephant island group',
    'authors': 'Furse, J.R., Bruce, G.',
    'year': '1975',
    'keywords': '',
    'reference': 'Journal of Tom',
    'format': ''},
    {
    'id': '3',
    'title':'On the taxonomic value of the intestinal convolutions in birds',
    'authors': 'Gadow, H',
    'year': '1889',
    'keywords': '',
    'reference': 'Journal of Tom',
    'format': ''},
    {
    'id': '4',
    'title': 'The origins of the biota of the Falkland Islands and South Georgia.',
    'authors': 'Buckland, P.C., Hammond, P.M.',
    'year': '1997',
    'keywords': 'Falkland islands, South georgia, Coleoptera, Fossil, Holocene, Refugia, Faunal origins, Charcoal',
    'reference': 'Journal of Tom',
    'format': ''},
    {
    'id': '5',
    'title': 'Mount Pleasant Airport. Falkland Islands: management and planning.',
    'authors': 'Chammings, M.B.',
    'year': '1987',
    'keywords': 'Engineering',
    'reference': 'Journal of Tom',
    'format': ''}
];

export const MOCK_PUBLICATIONS_CSV: string = `id,title,year,reference,authors,keywords,format
2725,Ornithology Report,1971,"In: Burley, M.K. (Ed)  Joint Services Expedition: Elephant Island, 1970-71.  London: Royal Geographical Society. pp F1-F11.","Furse, J.R., Bruce, G.",,Scientific Paper
2726,Birds of the elephant island group,1975,"Ibis, 117: 529-531","Furse, J.R., Bruce, G.",,Scientific Paper
2727,On the taxonomic value of the intestinal convolutions in birds,1889,Proceedings of the Zoological Society London: 303-316,"Gadow, H",,Letter
21,The origins of the biota of the Falkland Islands and South Georgia.,1997,"Quaternary Proceedings, 5, pp. 59-69.","Buckland, P.C., Hammond, P.M.","Falkland islands, South georgia, Coleoptera, Fossil, Holocene, Refugia, Faunal origins, Charcoal",Scientific Paper
26,Mount Pleasant Airport. Falkland Islands: management and planning.,1987,"Proceedings of the Institution of Civil Engineers, Part 1, 82: 59-75","Chammings, M.B.",Engineering,Scientific Paper`;
