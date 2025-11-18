Aplicação para alunos resolverem exercicios do enem para treinar


## RFs (Requisitos funcionais)

- [ x ] Deve ser possivel cadastrar
- [ ] Deve ser possivel se autenticar
- [ ] Deve ser possivel obter o perfil de u usuário logado
- [ ] Deve ser possivel acessar questões por materia
- [ ] Deve ser possivel fazer questões estilos enem
- [ ] Deve ser possivel visualizar pontuação total
- [ ] Testar possibilidade de correção de redação via IA
- [ ] Deve ser possível marcar questões para revisar depois
- [ ] Deve ser possível visualizar estatísticas de acertos por matéria
- [ ] Deve ser possível fazer simulados cronometrados (tempo real do ENEM)


## RNs (Regras de negócio)

- [ ] Questões devem ser aleatorizadas por padrão
- [ ] Pontuação deve ser calculada usando TRI (Teoria de Resposta ao Item)
- [ ] Questões mais difíceis valem mais pontos
- [ ] Redação deve ter entre 8 e 30 linhas
- [ ] Correção deve avaliar 5 competências
- [ ] Cada competência vale de 0 a 200 pontos

## RNFs (Requisitos não-funcionais)

- [ ] O sistema deve responder requisições em menos de 100 ms
- [ ] A aplicação deve suportar 1000 usuários simultâneos
- [ ] O carregamento de questões deve ser otimizado com cache
- [ ] Imagens de questões devem ser comprimidas e otimizadas
- [ ] Senhas devem ser criptografadas com bcrypt
- [ ] Deve usar HTTPS em produção
- [ ] Tokens JWT devem ser usados para autenticação
- [ ] Rate limiting para prevenir abuso de API