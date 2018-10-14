package com.tracability.rule;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.tracability.main.Communication;

public class Rule {
	 	private List<Condition> conditions;
	 	private String ruleId;
	 	private String description;
	 	private String type;
	 	private String creationDate;
	    private Rule.eventType eventType;

	    public List<Condition> getConditions() {
	        return conditions;
	    }

	    public void setConditions(List<Condition> conditions) {
	        this.conditions = conditions;
	    }

	    public Rule.eventType getEventType() {
	        return eventType;
	    }

	    public void setEventType(Rule.eventType eventType) {
	        this.eventType = eventType;
	    }

	    public String getRuleId() {
			return ruleId;
		}

		public void setRuleId(String ruleId) {
			this.ruleId = ruleId;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}

		public String getCreationDate() {
			return creationDate;
		}

		public void setCreationDate(String creationDate) {
			this.creationDate = creationDate;
		}

		@Override
	    public String toString(){
	        StringBuilder statementBuilder = new StringBuilder();

	        for (Condition condition : getConditions()) {

	            String operator = null;

	            switch (condition.getOperator()) {
	                case EQUAL_TO:
	                    operator = "==";
	                    break;
	                case NOT_EQUAL_TO:
	                    operator = "!=";
	                    break;
	                case GREATER_THAN:
	                    operator = ">";
	                    break;
	                case LESS_THAN:
	                    operator = "<";
	                    break;
	                case GREATER_THAN_OR_EQUAL_TO:
	                    operator = ">=";
	                    break;
	                case LESS_THAN_OR_EQUAL_TO:
	                    operator = "<=";
	                    break;
	            }

	            statementBuilder.append(condition.getField()).append(" ").append(operator).append(" ");

	            if (condition.getValue() instanceof String) {
	                statementBuilder.append("'").append(condition.getValue()).append("'");
	            } else {
	                statementBuilder.append(condition.getValue());
	            }

	            statementBuilder.append(" && ");
	        }

	        String statement = statementBuilder.toString();

	        // remove trailing &&
	        return statement.substring(0, statement.length() - 4);
	    }

	    public static enum eventType {

	        DANGEROUSGAS(" DANGEROUSGAS"),
	        TEMPERATURES("TEMPERATURES");
	        private final String value;
	        private static Map<String, Rule.eventType> constants = new HashMap<String, Rule.eventType>();

	        static {
	            for (Rule.eventType c: values()) {
	                constants.put(c.value, c);
	            }
	        }

	        private eventType(String value) {
	            this.value = value;
	        }

	        public static Rule.eventType fromValue(String value) {
	            Rule.eventType constant = constants.get(value);
	            if (constant == null) {
	                throw new IllegalArgumentException(value);
	            } else {
	                return constant;
	            }
	        }

	    }

		public static Rule getRulesFromProfileId(String id) throws IOException, ParseException {
			Rule rule_1 = new Rule();
			String JSONStandart=  Communication.get("http://localhost:3000/api/Rule/" + id);
			JSONParser parser = new JSONParser();
			Object receptedValue = parser.parse(JSONStandart);
			JSONObject level1Pars = (JSONObject) receptedValue;
		
			rule_1.setDescription(level1Pars.get("description").toString());
			rule_1.setType(level1Pars.get("type").toString());
			rule_1.setCreationDate(level1Pars.get("creationDate").toString());
			String operatorTest = level1Pars.get("operator").toString();
			
			List<Condition> conditions = new ArrayList<Condition>();
			Condition HightValueTemperature = new Condition();
			HightValueTemperature.setField(level1Pars.get("measureType").toString());
			Double value = Double.valueOf(level1Pars.get("value").toString());
			HightValueTemperature.setValue(value);
			
			
			switch (operatorTest) {
				case "<":
					HightValueTemperature.setOperator(Condition.Operator.LESS_THAN);
					break;
				case "<=":
					HightValueTemperature.setOperator(Condition.Operator.LESS_THAN_OR_EQUAL_TO);
					break;
				case ">":
					HightValueTemperature.setOperator(Condition.Operator.GREATER_THAN);
					break;
				case ">=":
					HightValueTemperature.setOperator(Condition.Operator.GREATER_THAN_OR_EQUAL_TO);
					break;
				case "=":
					HightValueTemperature.setOperator(Condition.Operator.EQUAL_TO);
					break;
				default:
					break;
			}
			conditions.add(HightValueTemperature);
			rule_1.setConditions(conditions);
			return rule_1;
		}
}
