"use client";
import { Input, Select, SelectItem, Slider, Switch } from "@nextui-org/react";
import React, { useState } from "react";

function License() {
  const [selectedLicense, setSelectedLicense] = useState<string>("");
  const [derivationEnabled, setDerivationEnabled] = useState<boolean>(false);

  const onChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSelectedLicense(e.target.value);
  };
  return (
    <div>
      <div className="flex gap-3 items-center">
        <Switch defaultSelected className="mt-4">
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
          />
        </div>
      )}
    </div>
  );
}

export default License;
