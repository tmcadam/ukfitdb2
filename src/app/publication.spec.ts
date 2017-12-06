import { Publication } from './publication'
import { MOCK_PUBLICATIONS } from './publications.mock'

describe('Publication interface', () => {
    it('provides a template for storing publications locally', ()=>{
        let pub :Publication = MOCK_PUBLICATIONS[0]
        expect(pub.id).toBe('2725')
        expect(pub.title).toBe('Ornithology Report')
        expect(pub.year).toBe('1971')
        expect(pub.authors).toBe('Furse, J.R., Bruce, G.')
        expect(pub.reference).toBe('In: Burley, M.K. (Ed)  Joint Services Expedition: Elephant Island, 1970-71.  London: Royal Geographical Society. pp F1-F11.')
        expect(pub.keywords).toBe('')
        expect(pub.format).toBe('Scientific Paper')
    })
})
