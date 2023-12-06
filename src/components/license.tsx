"use client";
import { Input, Select, SelectItem, Slider, Switch } from "@nextui-org/react";
import React, { useState } from "react";

function License() {
  const [derivationEnabled, setDerivationEnabled] = useState<boolean>(false);
  const [derivationPercentage, setDerivationPercentage] = useState<number>(10);
  const [commercialUse, setCommercialUse] = useState<boolean>(false);

  const onChangeDerivationPercentage = (e: any) => {
    setDerivationPercentage(Number(e));
  };

  return (
    <div>
      <div className="flex gap-3 items-center">
        <Switch
          defaultSelected
          className="mt-4"
          onValueChange={setCommercialUse}
        >
          Commercial Use
        </Switch>
        <Switch
          className="mt-4"
          isSelected={derivationEnabled}
          onValueChange={setDerivationEnabled}
        >
          Enable Derivation
        </Switch>
      </div>
      {derivationEnabled && (
        <div className="flex flex-col gap-3 mt-4">
          <Slider
            size="lg"
            step={5}
            color="foreground"
            label="Derivation Percentage"
            showSteps={true}
            maxValue={80}
            minValue={0}
            defaultValue={10}
            className="w-full"
            onChange={onChangeDerivationPercentage}
          />
        </div>
      )}
    </div>
  );
}

export default License;
