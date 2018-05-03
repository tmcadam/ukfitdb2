import { Publication } from '../publication'

export class MockSearchService {
    results: Publication[] = []
    searchTerm: string = ''
    search() :void {}
}
