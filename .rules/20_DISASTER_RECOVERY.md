# 20 DISASTER RECOVERY

- PostgreSQL must have automated backups.
- Soft-deleted data can be recovered by an Admin by setting `isDeleted = false`.
- In case of deployment failure, roll back to the previous Vercel/Docker build.\n