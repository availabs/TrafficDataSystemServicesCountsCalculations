### The short_count_volume MinimalKey

```sql
npmrds_production=#select exists (
  select
      count_id,
      year,
      month,
      day,
      federal_direction,
      lane_code,
      count(1)
    from highway_data_services.short_count_volume
    group by 1,2,3,4,5,6
    having count(1) > 1
); 
--------
 f
(1 row)
```
