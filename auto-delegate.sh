#!/bin/bash
# Save file into /usr/local/bin/auto-delegate.sh and run /usr/local/bin/auto-delegate.sh from root
# Set gaiad password (named "GAIA_KEY") as an env var here: /etc/systemd/system/myservice.service.d/myenv.conf
# NOTE: if you have not yet set any env vars, then you must first run: systemctl edit auto_withdraw_delegate.service
#       which will generate the above file (at /etc/systemd/system/myservice.service.d/myenv.conf)

while true
do
  num_unconfirmed_txs=$(curl -v --silent curl localhost:26657/num_unconfirmed_txs --stderr - | grep n_txs | cut -c15)
  echo "Number of unconfirmed txs: $num_unconfirmed_txs"
  if [[ ($num_unconfirmed_txs -gt 0)]]
  then
      echo "There is a TX in the mempool"
      echo "..."
      sleep 60s
  else
    amount_steak=$(sudo -u gaiad /opt/go/bin/gaiacli --home=/opt/gaiacli query account cosmos1844lltc96kxkm5mq03my90se4cdssewmh77shu --chain-id=game_of_stakes_3 --trust-node=true | jq -r '.value.coins[0].amount')
    echo "Number of stakes: ${amount_steak}"
    if [[ $amount_steak > 0 && $amount_steak != "null" && ($amount_steak -lt 10000000)]]
      then
        duration=$(( SECONDS - start ))
        echo "$duration seconds since last TX call"
        echo "Sending transaction to delegate ${amount_steak} stakes"
        echo "${GAIA_KEY}" | sudo -u gaiad /opt/go/bin/gaiacli tx stake delegate --home=/opt/gaiacli --amount=${amount_steak}STAKE --from=game-of-stake-key-validator4 --validator=cosmosvaloper1844lltc96kxkm5mq03my90se4cdssewmj229m0 --chain-id=game_of_stakes_3 --fee=1000photinos | start=$SECONDS
      else
        echo "Sending transaction to withdraw stakes"
        echo "${GAIA_KEY}" | sudo /opt/go/bin/gaiacli --home=/opt/gaiacli tx dist withdraw-rewards --async --is-validator --from=game-of-stake-key-validator4 --chain-id=game_of_stakes_3 --trust-node
    fi
    sleep 5m
  fi
done
