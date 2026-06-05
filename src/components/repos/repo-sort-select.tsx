import { parseAsStringEnum, useQueryState } from 'nuqs';
import { Select } from '@/components/ui/select';
import type { RepoSortField, SortOrder } from '@/types/repo';

const sortOptions: { value: RepoSortField; label: string }[] = [
  { value: 'stars', label: 'Estrelas' },
  { value: 'name', label: 'Nome' },
  { value: 'updated', label: 'Atualização' },
  { value: 'forks', label: 'Forks' },
];

const orderOptions: { value: SortOrder; label: string }[] = [
  { value: 'desc', label: 'Decrescente' },
  { value: 'asc', label: 'Crescente' },
];

export function RepoSortSelect() {
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsStringEnum<RepoSortField>([
      'stars',
      'name',
      'updated',
      'forks',
    ]).withDefault('stars'),
  );

  const [order, setOrder] = useQueryState(
    'order',
    parseAsStringEnum<SortOrder>(['asc', 'desc']).withDefault('desc'),
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <label className="text-sm text-github-muted" htmlFor="sort-field">
        Ordenar por
      </label>
      <Select
        id="sort-field"
        value={sort}
        onChange={(event) => setSort(event.target.value as RepoSortField)}
        aria-label="Campo de ordenação"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      <Select
        id="sort-order"
        value={order}
        onChange={(event) => setOrder(event.target.value as SortOrder)}
        aria-label="Ordem de classificação"
      >
        {orderOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
